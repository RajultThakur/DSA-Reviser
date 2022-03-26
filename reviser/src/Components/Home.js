import React, { useContext, useEffect, useState } from 'react'
import Fade from "react-reveal/Fade"
import QuestionCard from './HomeSubComponent/QuestionCard'
import TopicsName from './HomeSubComponent/TopicsName'
import DsaContext from '../Context/DsaContext'
import Progress from './HomeSubComponent/Progress and Goals/Progress';
import DailyTask from './HomeSubComponent/Progress and Goals/DailyTask';
import Hints from './HomeSubComponent/Hints';
import ShowHints from './HomeSubComponent/ShowHints';
import RandomTopic from './HomeSubComponent/RandomQue/RandomTopic';
import PracticeQuestion from './HomeSubComponent/RandomQue/PracticeQuestion';
import Loder from './Loder';
import OneRandomQue from './OneRandomQue';
import { useHistory } from 'react-router-dom';
function Home () {
    const context = useContext(DsaContext);
    const {bookMarkedQuestion,lode, getBookmark,bookmark,allQuestions, setIsLogin, updeteOnce, RamdomQuestions, Topics, Questions, getMarkedQuestions, markedQuestions, getHints, getDataForRandomQue, OneRandom } = context;
    const [loding, setloding] = useState(true)
    let coutn = 0, count2 = 0;
    let str = "No question"
    const history = useHistory();
    useEffect(() => {
        const fun = async () => {
            if (localStorage.getItem('token')) {
                setIsLogin(1);
                allQuestions();
                await getMarkedQuestions();
                await getHints();
                await getDataForRandomQue();
                await getBookmark();
                setloding(false)
                // await updeteOnce();
                setIsLogin(true);
            } else {
                history.push('/login')
            }
        }
        fun();
        // eslint-disable-next-line
    }, [])
    return (<>
        {localStorage.getItem("token") && <div className="app-container">
            <div className='main-container'>
                <div className='randomQuestionContainer'>
                    <Fade left>
                    <div className="question_and_topic_container1">
                        {Topics && Topics.map((ele) => {
                            return <RandomTopic key={Math.random()} count={coutn++} topics={ele} />
                        })}
                    </div>
                    </Fade>   
                        <Fade right>
                    <h1 style={{ marginLeft: "10px" }}><span style={
                        {color:'#0D92A8'}}>R</span>andom-<span style={
                            {color:'#0D92A8'}}>Q</span>uestions!</h1>
</Fade>
                   
                    {loding ? <Loder /> : <div className="random_question">
                    <Fade>{RamdomQuestions !== str?<table className="table">
                            <tbody>{RamdomQuestions.map((ele)=>{ return <PracticeQuestion key={Math.random()} que={ele} topic={Topics} /> })}</tbody>
                        </table> : <h3 style ={{padding:"45px"}}>All questions completed selected other topic or refresh the page</h3>}</Fade>

                        <p style={{ float: "right", color: "#75df1a" }}><strong>NOTE*</strong> Question will update daily on the basis of selected topic!</p>

                    </div>}

                </div>

                <div className="hide">.</div>
                <Fade left >
                <div className='question_and_topic_container'>

                    <div className='topics'>
                        <button style={{ fontWeight: "600" }} className="btn topic_btn" onClick={() => { allQuestions() }}>All <span style={{
                            color: "#0d6efd",
                            fontWeight: "700"
                        }}>450</span></button>
                    </div>
                   
                    {Topics && Topics.map((ele) => {
                        return <TopicsName key={Math.random()} count={count2++} topics={ele} />
                    })}

                    <OneRandomQue />

                    <div className='topics'>
                        <button title="one random question" style={{ fontWeight: "600", color: '#5bcd3e' }} onClick={() => { OneRandom() }} className="btn topic_btn"><i className="fas fa-random"></i></button>
                    </div>
                </div>
                </Fade>
                <br />

                <div className='questions'>
                    <Hints />
                    <ShowHints />
                    <table className="table">
                    <thead><tr>
                            <th scope="col">#</th>
                            <th scope="col">Problems</th>
                            <th scope="col">Topic</th>
                            <th scope="col">Solved</th>
                            <th scope="col">Hint</th>
                            <th scope="col">Hint</th>
                            <th scope="col">IMP</th>
                        </tr></thead>
                        <tbody>{Questions && <QuestionCard indexes={markedQuestions ? markedQuestions : ""} question={Questions} />}</tbody>
                    </table>

                </div>

            </div>
            <div className="progress-container">
                <DailyTask />
                <Progress lode ={lode} bookmark ={bookmark} question={bookMarkedQuestion} />
            </div>
        </div>}
    </>
    )
}

export default Home
