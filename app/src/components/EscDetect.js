import { useEffect, useContext } from 'react'
import { FbContext } from '../store/fbContext'


const EscDetect = () => {

  const { status, dispatch } = useContext(FbContext)

  useEffect(() => {

    const keyEvent = (e) => {
      if(e.code === "Escape"){
        if(status.showSheet){
          dispatch({type:'HIDE_SHEET'})
        }else if(status.showProjectSheet){
          dispatch({type:'HIDE_PROJECT_SHEET'})
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