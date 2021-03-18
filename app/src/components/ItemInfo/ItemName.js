import React, { useState } from 'react'
import { updateName } from '../../store/actions'
import TextareaAutosize from 'react-textarea-autosize';


const ItemName = ({ item }) => {

  const name = item.name

  const [editing, setEditing] = useState(0)
  const [newName, setNewName] = useState(name)

  const lostFocus = () => {
    if(newName !== name){
      updateName(newName, item.id)
    }
    setEditing(0)
  }

  const textChange = (e) => {
    setNewName(e.target.value)
  }

  const onClick = () => {
    setEditing(1)
  }

  const onFocus = (e) => {
    e.target.select()
  }

  if(editing === 1) return <td><TextareaAutosize onFocus={onFocus} className={'tableTextArea ' + item.colorClass} autoFocus onChange={textChange} onBlur={lostFocus} value={newName}></TextareaAutosize></td>

  return ( 
    <td onClick={onClick}><p>{ name }</p></td>
   );
}
 
export default ItemName;