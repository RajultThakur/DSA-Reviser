import React, { useContext } from 'react'
import DsaContext from '../Context/DsaContext'
function OneRandomQue () {
    const context = useContext(DsaContext);
    const { Random,removeRandom,launchHint,launchModal } = context
    return (<>{Random?<div className="oneRandom"><table style={{margin:"0px"}}className="table"><tbody><tr><th scope="row">{Random.index}:</th>
    <td><a className="que" href={Random.link}>{Random.title.substr(0,40)}{Random.title.length>40&&"..."}</a></td>
    <td style={{fontWeight:"600",fontSize:"15px"}}>{Random.topic}</td>
    <td><button className="btn btn-primary px-1 py-0" onClick={()=>{launchModal(Random.topic,Random.index)}}><i className="fas fa-pen"></i></button></td>
    <td><button className="btn btn-primary px-1 py-0" onClick={()=>{launchHint(Random.index)}}><i className="fas fa-file-alt"></i></button></td>
    <td><input style={{marginTop:"2px"}} type="checkBox" defaultChecked={0} onClick={()=>{removeRandom()}}/></td>
    </tr></tbody></table></div>:""}
    </>
    )
}

export default OneRandomQue