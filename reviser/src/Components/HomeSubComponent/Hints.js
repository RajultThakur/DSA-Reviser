import React, { useState, useRef, useContext } from 'react'
import DsaContext from '../../Context/DsaContext'
function Hints () {

    const contaxt = useContext(DsaContext);
    const { ref, modalData,makeHints,markTheQuestion,getMarkedQuestions } = contaxt;
    const [Hint, setHint] = useState({hint:""});
    const onchange = (e) => {
        setHint({ ...Hint, [e.target.name]: e.target.value });
    }
    const closeref = useRef(null);
    const handleClick = (e)=>{
        e.preventDefault();
        if(Hint.hint){
            makeHints(modalData.index,Hint.hint);
            closeref.current.click();
            setHint({hint:""});
            markTheQuestion(parseInt(modalData.index));
            getMarkedQuestions();
        }else{
            alert('pleas fill all fiesds')
        }
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:"none"}}>
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{modalData.topic} <span>Que.No:-{modalData.index}</span></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label"><h5>Hint :)</h5></label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" name="hint" namearia-describedby="emailHelp" value={Hint.hint} placeholder="Add your hint..." required={true} onChange={onchange}/>
                                </div>
                                <div className="modal-footer">
                                    <button ref={closeref} style={{display:"none"}} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button   type="submit" className="btn btn-primary" onClick={handleClick}>Done</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hints
