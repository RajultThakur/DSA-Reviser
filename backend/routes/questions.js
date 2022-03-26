const router = require("express").Router();
const Question = require("../models/Questions");
const solvedQuestion = require('../models/SolvedQuestions');
const fetchUser = require("../middlewear/jwtVerify");
const markedQuestion = require('../models/MarkedQues');
const hint=require("../models/Hints");
const Bookmark = require("../models/Bookmark");

router.post('/getdetails', fetchUser, async (req, res) => {
    const { idx } = req.body
    const data = await solvedQuestion.findOne({ user_id: req.user.id, topicIndex: idx });
    if (data) {
        return res.json({ indexes: data.solvedQuestion });
    } else return res.json('not found')
})

router.get('/gethints',fetchUser,async(req,res) =>{
    try {
        const Data = await hint.findOne({user_id:req.user.id});
        if(Data){
            return res.status(201).json({Data:Data.Hints});
        }else return res.json({sucess:true,Data:[]});

    } catch (error) {
        res.status(401).json('internal server error')
        console.log(error);
    }
})


router.post("/makehint",fetchUser,async(req,res) => {
    const { idx,que_hint } = req.body;

    try {
        const Data = await hint.findOne({ user_id: req.user.id });
        if (Data) {

            const hints = Data.Hints;

             hints[idx] = que_hint;

            const updatedData = {};
            updatedData.Hints = hints;

            const updatedHints = await hint.findOneAndUpdate({ user_id: req.user.id }, { $set: updatedData }, { new: true })

            return res.status(201).json({ sucess:"updated" });
        }
        else {
            const hints = new Array(446);
            hints.fill(0);

             hints[idx] = que_hint;

            const new_hints = new hint({
                user_id: req.user.id,
                Hints: hints
            });

            const data = await new_hints.save();

            return res.status(201).json({ sucess:"created"});
        }

    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
})

router.get('/getmarkedquestions',fetchUser,async(req,res) =>{
    try {
        const Data = await markedQuestion.findOne({user_id:req.user.id});
        if(Data){
            return res.status(201).json({Data:Data.marked_questions});
        }else return res.json({sucess:true,Data:[]});

    } catch (error) {
        res.status(401).json('internal server error')
        console.log(error);
    }
})

router.post('/markedquestions', fetchUser, async (req, res) => {
    const { idx } = req.body;

    try {
        const Data = await markedQuestion.findOne({ user_id: req.user.id });
        if (Data) {

            const question = Data.marked_questions;

            let index = question.indexOf(idx);
            if(index===-1)
            question.push(idx);
            else{
                if(index===question.length-1) question.pop();
                else question[index] = question.pop();
            }

            const updatedData = {};
            updatedData.marked_questions = question;

            const updatedQuestions = await markedQuestion.findOneAndUpdate({ user_id: req.user.id }, { $set: updatedData }, { new: true })

        }
        else {
            const  question = [];
            question.push(idx);

            const new_marked_questions = new markedQuestion({
                user: req.user.name,
                user_id: req.user.id,
                marked_questions: question
            });

            await new_marked_questions.save();

            return res.status(201).json({ sucess:"created" });
        }

    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }

})

router.get("/getdata", fetchUser, async (req, res) => {
    try {
        const isPresent = await Question.findOne({ user_id: req.user.id });
        if (!isPresent) {
            let arr = new Array(36);

            arr.fill(0);
            let i = 3;
            const randomQus = [];
            while (i !== 0) {
                let a = Math.random() * (36);
                a = Math.floor(a);
                if (arr[a] === 0) {
                    arr[a] = 1;
                    randomQus.push(a);
                    i--;
                }
            }
            const question = new Question({
                user: req.user.name,
                dsa: 0,
                quantity: 3,
                questions: arr,
                queNumber: randomQus,
                user_id: req.user.id,
                len: 3,
            })
            await question.save()
            return res.status(201).json({ dsa:question.dsa, questionNumber: question.queNumber });
        } else {
            return res.status(201).json({ dsa:isPresent.dsa, questionNumber: isPresent.queNumber });
            // return res.json(" found")
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error });
    }

})

router.post('/solvedquestions', fetchUser, async (req, res) => {
    const { topicName, topicIndex, topicLength, questionIdxNumber } = req.body
    try {
        const data = await solvedQuestion.findOne({ user_id: req.user.id, topicIndex });
        const indexes = [];
        if (data) {
            const questionNumArr = data.solvedQuestion;

            if (questionNumArr[questionIdxNumber] === 0)
                questionNumArr[questionIdxNumber] = 1;
            else if (questionNumArr[questionIdxNumber] === 1)
                questionNumArr[questionIdxNumber] = 0;

            const newData = {};
            newData.solvedQuestion = questionNumArr

            const updetedData = await solvedQuestion.findOneAndUpdate({ user_id: req.user.id, topicIndex }, { $set: newData }, { new: true })

            for (let i = 0; i < data.topicLength; i++) {
                if (data.solvedQuestion[i] === 1) {
                    indexes.push(i);
                }
            }
            return res.status(201).json({ solvedQuestion: updetedData.solvedQuestion, indexes });

        } else {
            const questionNumArr = new Array(topicLength);
            questionNumArr.fill(0);
            questionNumArr[questionIdxNumber] = 1;
            const newData = new solvedQuestion({
                user: req.user.name,
                user_id: req.user.id,
                topicIndex,
                topicLength,
                topicName,
                solvedQuestion: questionNumArr
            })
            const details = await newData.save();
            indexes.push(questionIdxNumber);
            return res.status(201).json({ solvedQuestion: details.solvedQuestion, indexes });
        }

    } catch (error) {
        console.log(error);
        return res.status(401).json(`internal server error ${error}`);
    }
})

router.put('/updateonce', fetchUser, async (req, res) => {
    try {
        const userChoice = await Question.findOne({ user_id: req.user.id });
        const date = new Date().toDateString();

        if (date !== userChoice.date) {
            const questions = userChoice.questions;
            let i = 3;
            const queNumber = [];

            while (i !== 0) {
                let num = Math.floor(Math.random() * (questions.length));
                if (questions[num] === 0 && userChoice.len + 3 <= questions.length) {
                    questions[num] = 1;
                    queNumber.push(num);
                    i--;
                } else if (userChoice.len + 3 > questions.length) {
                    return res.json("limit over")
                }
            }

            const newData = {};
            newData.questions = questions;
            newData.queNumber = queNumber;
            newData.len = userChoice.len + 3;
            newData.date = date

            const updetedQuestions = await Question.findOneAndUpdate({ user_id: req.user.id }, { $set: newData }, { new: true });

            return res.status(201).json({ sucess: true, dsa:updetedQuestions.dsa,questionNumber: updetedQuestions.queNumber  });
        }
        else {
            return res.json({ sucess: false })
        }


    } catch (error) {
        console.log(error)
        return res.status(401).json("internal server error")
    }

}
)

router.put("/settopic", fetchUser, async (req, res) => {
    const { dsa, quantity, len } = req.body;
    try {
        const userChoice = await Question.findOne({ user_id: req.user.id });

        if (dsa !== userChoice.dsa) {
            const arr = new Array(len);
            arr.fill(0);
            const questions = arr;
            let i = quantity;
            const queNumber = [];

            while (i !== 0) {
                let num = Math.floor(Math.random() * (questions.length));
                if (questions[num] === 0) {
                    questions[num] = 1;
                    queNumber.push(num);
                    i--;
                }
            }

            const newData = {};
            newData.questions = questions;
            newData.queNumber = queNumber;
            newData.dsa = dsa;
            newData.len = quantity;

            const updetedQuestions = await Question.findOneAndUpdate({ user_id: req.user.id }, { $set: newData }, { new: true });

            return res.status(201).json({dsa:updetedQuestions.dsa,questionNumber: updetedQuestions.queNumber });

        }
        else if (dsa === userChoice.dsa) {
            const questions = userChoice.questions;
            let i = quantity;
            const queNumber = [];
            let t = 0;
            while (i > 0) {
                let num = Math.floor(Math.random() * (questions.length));
                if (questions[num] === 0 && userChoice.len + t <= len) {
                    questions[num] = 1;
                    queNumber.push(num);
                    if(userChoice.len + quantity > len) i=0;
                    i--;t++;
                } else if (userChoice.len + quantity > questions.length) {
                    return res.json("limit over")
                }
            }

            const newData = {};
            newData.questions = questions;
            newData.queNumber = queNumber;
            newData.dsa = dsa;
            newData.len = userChoice.len + quantity;

            const updetedQuestions = await Question.findOneAndUpdate({ user_id: req.user.id }, { $set: newData }, { new: true });

            return res.status(201).json({dsa:updetedQuestions.dsa,questionNumber: updetedQuestions.queNumber });
            //  return res.status(201).json(userChoice.questions);

        }


    } catch (error) {
        res.status(401).json({ error });
        console.log(error);
    }

})

router.post("/bookmark",fetchUser,async(req,res) => {
    const {idx} = req.body;
    try {
        const data = await Bookmark.findOne({user_id:req.user.id});
        if(data){
            let question = data.bookMarkQue;
            let index = question.indexOf(idx);
            if(index===-1)
            question.push(idx);
            else{
                if(index===question.length-1) question.pop();
                else question[index] = question.pop();
            }
            var sortasc = function (a, b) { return a - b; }
            question.sort(sortasc);
            const newData = {};
            newData.bookMarkQue = question;

            const updatedData = await Bookmark.findOneAndUpdate({user_id:req.user.id},{$set:newData},{new:true});
            return res.status(201).json({ sucess:"updeted" });
        }else{
            const  question = [];
            question.push(idx);
            const bookmark = new Bookmark({
                user_id:req.user.id,
                bookMarkQue:question
            })

            const data = await bookmark.save();
            return res.status(201).json({ sucess:"created" });
        }
    } catch (error) {
        console.log(error);
        res.json({error});
    }
})

router.get("/bookmark",fetchUser,async(req,res) => {
    try {
        const data = await Bookmark.findOne({user_id:req.user.id});
        // return res.json(data);
        if(data===null) return res.json({data:''});
        return res.status(201).json({data:data.bookMarkQue.length>0?data.bookMarkQue:""});
    } catch (error) {
        console.log(error)
        res.json(error)
        
    }
})

module.exports = router;