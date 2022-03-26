import React,{useContext} from 'react'
import DsaContext from '../../Context/DsaContext'
function ShowHints () {

  const contaxt = useContext(DsaContext);
    const { showRef,yoursHints,modalData2 } = contaxt;

    

  return (
    <>
<button ref={showRef} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{display:"none"}}>
  Launch static backdrop modal
</button>

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Modal title {modalData2}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       {yoursHints?yoursHints[modalData2]? yoursHints[modalData2]:"No hints to preview!":""}
       
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default ShowHints
