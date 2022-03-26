import React, { useContext } from 'react'
import DsaContext from '../../Context/DsaContext';
function QuestionCard (props) {

    const checkBoxStyle = ({
        width: "20px",
        height: "20px",
        textAlign: "center",
        borderRadius: "45px",
        marginRight: "5px",
        marginLeft: "10px"
    })
    const context = useContext(DsaContext);
    const { markTheQuestion,launchModal, launchHint, bookMarkQuestion, bookmark } = context;

    const { question, indexes } = props;

    const style = ({
        background: "#E7E9EB"
    });
    const style2 = ({
        background: "white"
    });
    return (<>

        {question.map((ele) => {
            return <tr style={ele.index % 2 === 0 ? style : style2} key={Math.random()}>
                <th scope="row">{ele.index}:</th>
                <td><a className="que" target='_blank' href={ele.link}>{ele.title.substr(0, 59)}{ele.title.length > 59 && "..."} </a></td>
                <td style={{ fontWeight: "600", fontSize: "15px" }}>{ele.topic}</td>
                <td><input type="checkBox" defaultChecked={indexes&&indexes.indexOf(parseInt(ele.index))!==-1?1:0} onClick={() => { markTheQuestion(parseInt(ele.index)) }} /></td>
                <td><button disabled={!localStorage.getItem('token')} className="btn btn-primary px-1 mb-1 py-0" onClick={() => { launchModal(ele.topic, ele.index) }}><i className="fas fa-pen"></i></button></td>
                <td><button disabled={!localStorage.getItem('token')} className="btn btn-primary px-1 py-0 mb-1" onClick={() => { launchHint(ele.index) }}><i className="fas fa-file-alt"></i></button></td>
                <td><input style ={checkBoxStyle} type="checkBox" defaultChecked ={bookmark&&bookmark.indexOf(parseInt(ele.index-1))!==-1?1:0} onClick={()=>{bookMarkQuestion(parseInt(ele.index-1))}}/></td></tr>
        })}
    </>
    )
}

export default QuestionCard