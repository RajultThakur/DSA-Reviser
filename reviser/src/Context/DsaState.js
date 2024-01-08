import React, { useRef, useState } from 'react'
import DsaContext from './DsaContext'
import Data from './Data'
import { BACKEND_URL } from '../config/config'

const url = `${BACKEND_URL}/api/question`
const taskUrl =`${BACKEND_URL}/api/task` 
const DsaState = (props) => {

  const [Topics, setTopics] = useState([]); //for storing topics
  const [TopicWiseQuestions, setTopicWiseQuestions] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const [markedQuestions, setmarkedQuestions] = useState([])
  const [modalData, setModalData] = useState({ topic: "", index: "" })
  const [modalData2, setModalData2] = useState()
  const [yoursHints, setYoursHint] = useState()
  const [Task, setTaks] = useState()
  const [IsLogin, setIsLogin] = useState(false);
  const ref = useRef(null)
  const showRef = useRef(null)
  const topicWiseQuestions = [];
  const [Random, setRandom] = useState("")
  const refForRandom = useRef(null);
  const [bookMarkedQuestion, setbookMarkedQuestion] = useState()
  const [lode, setlode] = useState(1)

  const fetchData = () => {  // featchig all type of questions
    const topics = [];
    const questions = [];
    for (const key of Object.keys(Data)) {

      topics.push({ name: key, len: Data[key].length });
      topicWiseQuestions.push(Data[key]); //this is sotre array of questions type array
      Data[key].map((ele) => {
        return questions.push(ele);
      })
    }
    return { topics, topicWiseQuestions, questions };
  }


  const allQuestions = async () => {

    const obj = fetchData();

    setTopicWiseQuestions(obj.topicWiseQuestions);

    setTopics(obj.topics);

    setQuestions(obj.questions);
    setbookMarkedQuestion(obj.questions);

  }

  const seperateQuestions = (idx) => {
    setQuestions(TopicWiseQuestions[idx]);
  }

  const OneRandom =() => {
    let idx = Math.floor((Math.random()*(446+1)+1)-1);
    const q = Questions[idx];
    setRandom(q);
  }
  const removeRandom =() =>{
    setRandom("");
  }

  const markTheQuestion = async (idx) => {
    await fetch(`${url}/markedquestions`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("dsa_token")
        ,
      },
      body: JSON.stringify({ idx })
    });
    console.log(`${idx} marked`)
  }

  const getMarkedQuestions = async () => {
    const response = await fetch(`${url}/getmarkedquestions`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("dsa_token")
        ,
      },
    });

    const data = await response.json();
    setmarkedQuestions(data.Data);
  }

  

  const launchModal = (qusTopic, qusIndex) => {
    setModalData({ topic: qusTopic, index: qusIndex });
    ref.current.click();
  }

  const launchHint = (idx) => {
    setModalData2(idx);
    showRef.current.click();
  }

  const makeHints = async (idx, que_hint) => {
    // console.log(idx,que_hint);
    await fetch(`${url}/makehint`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("dsa_token")
        ,
      },
      body: JSON.stringify({ idx, que_hint })
    });
    await getHints()
  }

  const getHints = async()=>{
    const response = await fetch(`${url}/gethints`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("dsa_token")
        ,
      },
    });

    const data = await response.json();
    setYoursHint(data.Data);
  }

  const getYourTasks = async()=>{
    const response = await fetch(`${taskUrl}/gettasks`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("dsa_token")
        ,
      },
    });

    const data = await response.json();
    setTaks(data.tasks);
  }

  const setYourTask = async(tasks) => {
    const response = await fetch(`${taskUrl}/tasks`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("dsa_token")
        ,
      },
      body: JSON.stringify({ tasks })
    });
    const data = await response.json();
    setTaks(data.tasks);
  }

  const deletetask = async(str) => {
    const response = await fetch(`${taskUrl}/deletetask`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("dsa_token")
        ,
      },
      body: JSON.stringify({ str })
    });
    const data = await response.json();
    setTaks(data.tasks);
    
  }

  const [RamdomQuestions, setRandomQuestions] = useState()

  const random_question = (index,dsa) => {
    let topicWiseQuestions = [];
    let c=0;
    for (const key of Object.keys(Data)) {
      if(c===dsa){
        console.log(Data[key],"++++++")
        topicWiseQuestions = Data[key]; 
        break;
      }
      c++;
    }
    const randomQuestion =[];
    for(let i=0;i<3;i++){
       randomQuestion.push(topicWiseQuestions[index[i]]);
    }
    return randomQuestion;
  }
  const [selectedTopic, setSelectedTopic] = useState();

  const getDataForRandomQue =async() => {
    const response = await fetch(`${url}/getdata`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("dsa_token")
        ,
      },
    });

    const data = await response.json();
    console.log(data)
    // console.log(data,"data")
    setSelectedTopic(data.dsa)
    // console.log(data.questionNumber,"data_question number")
    // console.log(data.dsa,"data dsa")
    const randomQuestionData = random_question(data.questionNumber,data.dsa)
    setRandomQuestions(randomQuestionData);
  }

  const chooseTopic = async(quantity,dsa,len) => {
    const response = await fetch(`${url}/settopic`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("dsa_token")
        ,
      },
      body: JSON.stringify({quantity,dsa,len})
    });
    const data = await response.json();
    setSelectedTopic(data.dsa);
    console.log(data);
    if(data!=="limit over")
    setRandomQuestions(random_question(data.questionNumber,data.dsa));
    else
    setRandomQuestions("No question")

  }
  const updeteOnce = async() => {
    const response = await fetch(`${url}/updateonce`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("dsa_token")
        ,
      },
      body: JSON.stringify({})
    });
    const data = await response.json();
    // console.log(data);
    if(data.sucess)
    setRandomQuestions(random_question(data.questionNumber,data.dsa));
    // else alert('we are unable to updete question')
  }
  const [bookmark, setbookmark] = useState()

  const getBookmark = async() => {
    setlode(1);
    const response = await fetch(`${url}/bookmark`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("dsa_token")
        ,
      },
    });

    const data = await response.json();
    setbookmark(data.data)
    setlode(0);
    // console.log(data.data);
  }

  
  
  const bookMarkQuestion =async(idx) => {
    setlode(1);
    await fetch(`${url}/bookmark`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem("dsa_token")
        ,
      },
      body: JSON.stringify({idx})
    });
    // console.log(data.sucess)
    await getBookmark();
    setlode(0);
    
  }


  return (
    <DsaContext.Provider value={{lode,bookMarkedQuestion,getBookmark,bookMarkQuestion,bookmark,setIsLogin,IsLogin, getHints, modalData,modalData2, ref, launchModal, allQuestions, Topics, Questions, seperateQuestions, markTheQuestion, getMarkedQuestions, markedQuestions, makeHints,launchHint,showRef,yoursHints,getYourTasks,Task,setYourTask,getDataForRandomQue,RamdomQuestions,chooseTopic,updeteOnce,deletetask,selectedTopic, setSelectedTopic,OneRandom,refForRandom,Random,removeRandom }}>
      {props.children}
    </DsaContext.Provider>
  )
}
export default DsaState;  