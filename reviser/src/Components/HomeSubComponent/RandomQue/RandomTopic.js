import React, { useContext } from 'react'
import DsaContext from '../../../Context/DsaContext';
function RandomTopic(props) {
    const context = useContext(DsaContext);
    const {chooseTopic,selectedTopic, setSelectedTopic} = context;
    const {topics,count} = props;

    let color = selectedTopic===count?"#5bcd3e":'';

    const style = ({ 
        fontWeight: "600",
        color:color,
        marginInline:"1.7px",
        cursorPointer:"none"
     })

    return (
        <div className='topics'>
        <button style={style} className="btn topic_btn" onClick = {() =>{chooseTopic(3,count,topics.len);setSelectedTopic(count)}}>{topics.name} <span style={{
            color: "#0d6efd",
            fontWeight: "700"
        }}>{topics.len}</span></button>
    </div>
    )
}

export default RandomTopic
