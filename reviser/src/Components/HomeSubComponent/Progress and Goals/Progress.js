import React from 'react'
import Loder from '../../Loder';
import Fade from "react-reveal/Fade"
function Progress(props) {
  const {question,bookmark,lode} = props
  return (
    <Fade right>
    <div className='Progress'>
      
      <h4 style={{position:'sticky',top:'-10px',background:"#2b2b4c",padding:"3px",paddingBlock:"5px"}}><span style={
                {color:'#0D92A8'}}>B</span>ook-<span style={
                  {color:'#0D92A8'}}>M</span>arked <span style={
                  {color:'#0D92A8'}}>Q</span>uestions</h4>
      {/* {lode&&<Loder/>}   */}
      {lode?<Loder/>:bookmark&&<table className="table"><tbody style={{color:"white"}}>
      {bookmark.map((ele) => {
        return <tr style={{borderStyle:"none"}}className="bookmark" key={ele}><th style={{borderStyle:"none"}}>{question[ele].index}.</th><td style={{borderStyle:"none"}}><a href={question[ele].link} target="_blank" rel="noreferrer" >{question[ele].title.substr(0,40)}{question[ele].title.length>40&&"..."}</a></td><td style={{borderStyle:"none"}}><span style ={{float:'right'}}>{question[ele].topic}</span></td></tr>
      })}</tbody></table>}
     </div>
     </Fade>
  )
}

export default Progress
