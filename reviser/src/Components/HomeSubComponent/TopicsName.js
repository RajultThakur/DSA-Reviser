import React, { useContext } from 'react'
import DsaContext from "../../Context/DsaContext"
function TopicsName (props){
    const context = useContext(DsaContext);
    const { seperateQuestions } = context;
    const { topics, count } = props;
    return (
        <div className='topics'>
            <button style={{ fontWeight: "600" }} className="btn topic_btn" onClick={() => { seperateQuestions(count) }}>{topics.name} <span style={{
                color: "#0d6efd",
                fontWeight: "700"
            }}>{topics.len}</span></button>
        </div>
    )
}

export default TopicsName
