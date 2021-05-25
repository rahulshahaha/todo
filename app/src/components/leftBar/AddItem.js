import React, { useContext } from 'react'
import { FbContext } from '../../store/contexts/fbContext'
import { ModalContext } from '../../store/contexts/modalContext'

const AddItem = () => {

  const { FBuser } = useContext(FbContext)
  const { modalDispatch } = useContext(ModalContext)

  const addItem = () => {
    modalDispatch({type:'SHOW_SHEET'})
  }

  if(FBuser === null) return false

  return ( 
    <button className="btn" onClick={addItem}>Add Action</button>
   );
}
 
export default AddItem;