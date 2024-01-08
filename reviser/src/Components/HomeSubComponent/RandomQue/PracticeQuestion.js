import React from 'react'
function PracticeQuestion (props) {
    const { que} = props;
    return (
        <><tr><th scope="row">{que.index}:</th>
            <td><a className="que" href={que.link}>{que.title.substring(0,50)}</a></td>
            <td style={{ fontWeight: "600", fontSize: "15px" }}>{que.topic}</td>
            <td><input disabled={true} type="checkBox" defaultChecked={1} /></td></tr>
        </>
    )
}

export default PracticeQuestion
