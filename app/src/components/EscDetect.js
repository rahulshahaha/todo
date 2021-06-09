import { useEffect, useContext } from 'react'
import { ModalContext } from '../store/contexts/modalContext'
import { completeItem } from '../store/actions'
import { DataContext } from '../store/contexts/dataContext'
import { useHistory, useLocation } from 'react-router-dom'

const EscDetect = () => {

  const { modalStatus, modalDispatch } = useContext(ModalContext)
  const { items, weights } = useContext(DataContext)
  const history = useHistory()
  const loc = useLocation()

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

    const keyDownEvent = (e) => {
      if(e.code === "KeyD" && e.ctrlKey && modalStatus.itemID){
        completeItem(modalStatus.itemID, items, weights)
        modalDispatch({type:'HIDE_SHEET'})
      }
      if(e.code === "KeyQ"){
        if(loc.pathname === '/' || loc.pathname === '/working'){
          history.push('/planning')
        }else{
          history.push('/working')
        }
      }
      if(e.code === 'KeyP' && modalStatus.itemID){
        const item = items.filter(i => {
          return i.id === modalStatus.itemID
        })[0]
        modalDispatch({type: 'SHOW_PROJECT_SHEET', projectID: item.projectID})
        modalDispatch({type: 'HIDE_SHEET'})
      }
      if(e.code === "KeyN"){
        if(modalStatus.projectID){
          modalDispatch({type:'SHOW_SHEET',itemProjectID: modalStatus.projectID})
        }else{
          modalDispatch({type:'SHOW_SHEET'}) 
        }
      }
    }

    document.addEventListener("keyup", keyEvent);
    document.addEventListener("keydown", keyDownEvent);

    return(() => {
      document.removeEventListener("keyup", keyEvent);
      document.removeEventListener("keydown", keyDownEvent);
    })
  })

  return null
}
 
export default EscDetect;