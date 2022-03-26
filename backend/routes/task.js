const router = require("express").Router();
const task = require('../models/DailyTask');
const fetchUser = require("../middlewear/jwtVerify");
const e = require("express");

router.get("/gettasks",fetchUser,async(req,res)=>{

    try {
        const data = await task.findOne({user_id:req.user.id});
        if(data)
            res.json({tasks:data.tasks});
        else
            res.json("no task to preview");

    } catch (error) {
        res.json(error)
        console.log(error);
    }
   
})

router.delete("/deletetask",fetchUser,async(req,res) => {
    const {str} = req.body;
     const data = await task.findOne({user_id:req.user.id});
     const tasks = data.tasks;
     for(let i=0;i<tasks.length;i++){
         if(tasks[i]===str){
             let temp="";
             if(i!==tasks.length-1){
                 temp = tasks[tasks.length-1];
                 tasks[i] = temp;
             }
                 tasks.pop();
            

             const updatedTask = {};
            updatedTask.tasks = tasks;
            // updatedTask.date = date

            const newTask = await task.findOneAndUpdate({user_id:req.user.id}, { $set: updatedTask }, { new: true });

             
             return res.json({tasks:newTask.tasks});
            } 
     }
     return res.json("not found")

})

router.post("/tasks",fetchUser,async(req,res) => {
    const {tasks} = req.body;
    try {
        const date = new Date().toDateString();
        const data = await task.findOne({user_id:req.user.id});
        if(data){
            const my_task = data.tasks;
            my_task.push(tasks);

            const updatedTask = {};
            updatedTask.tasks = my_task;
            updatedTask.date = date

            const newTask = await task.findOneAndUpdate({user_id:req.user.id}, { $set: updatedTask }, { new: true });

            res.json({tasks:newTask.tasks});
        }
        else{
            const my_task = [];
            my_task.push(tasks);

            const myTask = new task({
                tasks,
                date,
                user_id:req.user.id
            })

            const newTask = await myTask.save()

            res.json({tasks:newTask.tasks});
        }
    } catch (error) {
        res.json(error)
        console.log(error);
    }
     
})
module.exports = router;