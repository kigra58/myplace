import React from 'react'

interface IProps{
    from:string;
    title:string
}

const Modal:React.FC<IProps> = ({from,title}) => {
    switch(from){
        case "addProblem" :
            
            return (
              <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{title??title} </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
          
          
          
          
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary"> Add Title </button>
                  </div>
                </div>
              </div>
            </div>
            )
        
        default:
            break;
    }
    return null;
}

export default Modal