import React, { useContext } from 'react'
import { addNewItem } from '../store/actions'
import { FbContext } from '../store/fbContext'

const AddItem = () => {

  const { user } = useContext(FbContext)

  const addItem = () => {
    addNewItem()
  }

  if(user === null) return false

  return ( 
    <button className="ml-10 mt-5 mb-10 btn" onClick={addItem}>Add Item</button>
   );
}
 
export default AddItem;