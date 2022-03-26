import React, { useContext,useEffect,useState } from 'react'
import Fade from "react-reveal/Fade"
import DsaContext from '../../../Context/DsaContext'
function DailyTask() {
    const context = useContext(DsaContext);
    const {getYourTasks,Task,setYourTask,deletetask} = context;
    const [TaskToAdd, setTaskToAdd] = useState({task:""});
    const onchange = (e) => {
        setTaskToAdd({ ...TaskToAdd, [e.target.name]: e.target.value });
    }

    const style = ({
        width: "218px",
    padding: "10px",
    margin: "auto",
    marginTop: "50px",
    textAlign: "center",
    })

    const addtask =async(e) =>{
    e.preventDefault();
    await setYourTask(TaskToAdd.task)
    setTaskToAdd({task:""})
    }


    useEffect(() => {
        const fun = async()=>{
            await getYourTasks();
        }
        fun();
        // eslint-disable-next-line
    }, [])

    return (
        <Fade right>
        <div className="daily-task">
           <div>
            <h4 style={{textAlign:"center"}}><span style={
                {color:'#0D92A8'}}>M</span>y <span style={{color:'#0D92A8'}}>T</span>ask</h4>
                <div className="assingtask">
                    {!Task&&<div style={style}><p>Add your very first task</p></div>}
            {Task?Task.map((ele)=>{
               return<div className ="yourTask" key={Math.random()}> <input title="task completed"  onClick ={()=>{deletetask(ele)}}  style={{margin: "0px",
                marginRight: "10px",paddingInline: "6px"}} type="checkBox" /><p style={{marginBlock:"10px"}}>{ele}</p></div>
            }):""}
                </div>
                <form className="taskTome">
                    <input  name="task" value={TaskToAdd.task} className="taskInput" type="text" placeholder="Assing task to your self..." required={true} onChange={onchange}/>
                    <button type="submit" disabled={TaskToAdd.task===""?true: false} className="taskbtn" onClick={addtask}>✔</button>
                </form>
            </div>
                </div>
                </Fade>
    )
}

export default DailyTask
