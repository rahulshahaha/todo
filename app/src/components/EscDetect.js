import { useEffect, useContext } from 'react'
import { ModalContext } from '../store/contexts/modalContext'


const EscDetect = () => {

  const { modalStatus, modalDispatch } = useContext(ModalContext)

  useEffect(() => {

    const keyEvent = (e) => {
      if(e.code === "Escape"){
        if(modalStatus.showSheet){
          modalDispatch({type:'HIDE_SHEET'})
        }else if(modalStatus.showProjectSheet){
          modalDispatch({type:'HIDE_PROJECT_SHEET'})
        }
      }
    }

    document.addEventListener("keyup", keyEvent);

    return(() => {
      document.removeEventListener("keyup", keyEvent);
    })
  })

  return null
}
 
export default EscDetect;