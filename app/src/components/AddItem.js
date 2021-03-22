import React, { useContext } from 'react'
import { addNewItem } from '../store/actions'
import { FbContext } from '../store/fbContext'

const AddItem = () => {

  const { FBuser, dispatch } = useContext(FbContext)

  const addItem = () => {
    addNewItem(dispatch)
  }

  if(FBuser === null) return false

  return ( 
    <button className="ml-10 mt-5 mb-10 btn" onClick={addItem}>Add Item</button>
   );
}
 
export default AddItem;