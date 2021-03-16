import React, { useState } from 'react'
import { updateDescription } from '../../store/actions'


const ItemDescription = ({ item }) => {
  const description = item.description

  const [editing, setEditing] = useState(0)
  const [newDescription, setNewDescription] = useState(description)

  const lostFocus = () => {
    updateDescription(newDescription, item.id)
    setEditing(0)
  }

  const textChange = (e) => {
    setNewDescription(e.target.value)
  }

  const onClick = () => {
    setEditing(1)
  }

  if(editing === 1) return <td><textarea className={'h-full resize-y ' + item.colorClass} autoFocus onChange={textChange} onBlur={lostFocus} value={newDescription}></textarea></td>

  return ( 
    <td onClick={onClick}>{ description }</td>
   );
}
 
export default ItemDescription;