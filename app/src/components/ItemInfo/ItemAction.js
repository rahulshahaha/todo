import React, { useState } from 'react'
import { updateAction } from '../../store/actions'


const ItemAction = ({ item }) => {
  const action = item.action

  const [editing, setEditing] = useState(0)
  const [newAction, setNewAction] = useState(action)

  const lostFocus = () => {
    updateAction(newAction, item.id)
    setEditing(0)
  }

  const textChange = (e) => {
    setNewAction(e.target.value)
  }

  const onClick = () => {
    setEditing(1)
  }

  if(editing === 1) return <td><textarea className={'h-full w-full resize-y ' + item.colorClass} autoFocus onChange={textChange} onBlur={lostFocus} value={newAction}></textarea></td>

  return ( 
    <td onClick={onClick}>{ action }</td>
   );
}
 
export default ItemAction;