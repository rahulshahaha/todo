import React, { useState } from 'react'
import { updateDescription } from '../../store/actions'
import TextareaAutosize from 'react-textarea-autosize';



const ItemDescription = ({ item }) => {
  const description = item.description

  const [editing, setEditing] = useState(0)
  const [newDescription, setNewDescription] = useState(description)

  const lostFocus = () => {
    if(description !== newDescription){
      updateDescription(newDescription, item.id)
    }
    setEditing(0)
  }

  const textChange = (e) => {
    setNewDescription(e.target.value)
  }

  const onClick = () => {
    setEditing(1)
  }

  const onFocus = (e) => {
    e.target.select()
  }

  if(editing === 1) return <td><TextareaAutosize onFocus={onFocus} className={'tableTextArea ' + item.colorClass} autoFocus onChange={textChange} onBlur={lostFocus} value={newDescription}></TextareaAutosize></td>

  return ( 
    <td onClick={onClick}>{ description }</td>
   );
}
 
export default ItemDescription;