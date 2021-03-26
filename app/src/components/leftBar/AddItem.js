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
    <button className="ml-10 mt-5 mb-10 btn" onClick={addItem}>Add Item</button>
   );
}
 
export default AddItem;