import React, { useState } from 'react'
import { updateAction } from '../../store/actions'
import TextareaAutosize from 'react-textarea-autosize';


const ItemAction = ({ item }) => {
  const action = item.action

  const [editing, setEditing] = useState(0)
  const [newAction, setNewAction] = useState(action)

  const lostFocus = () => {
    if(action !== newAction){
      updateAction(newAction, item.id)
    }
    setEditing(0)
  }

  const textChange = (e) => {
    setNewAction(e.target.value)
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  const onClick = () => {
    setEditing(1)
  }


  const onFocus = (e) => {
    e.target.select()
  }


  if(editing === 1) return <td><TextareaAutosize onFocus={onFocus} className={'tableTextArea ' + item.colorClass} autoFocus onChange={textChange} onBlur={lostFocus} value={newAction}></TextareaAutosize></td>

  return ( 
    <td onClick={onClick}>{ action }</td>
   );
}
 
export default ItemAction;