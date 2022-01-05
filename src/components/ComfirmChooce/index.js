import './style.css'

function ConfirmChoose({ show, setClose, message, handleConfirm }) {
      return(
        <>
          {
            show && 
            <div className='container-confirm-delete'>
              <div className='arrow-up'></div>
              <span>{message}</span>
      
              <div className='container-button'>
                <button 
                className='btn-actions-confirm-delete blue'
                onClick={() => handleConfirm()}>
                  Sim
                </button>
                <button
                className='btn-actions-confirm-delete red'
                onClick={() => setClose(false)}>
                  Não
                </button>
              </div>
            </div>
          }
        </>
      )
  }

export default ConfirmChoose;