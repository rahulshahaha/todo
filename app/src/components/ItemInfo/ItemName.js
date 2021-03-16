import React, { useState } from 'react'
import { updateName } from '../../store/actions'


const ItemName = ({ item }) => {

  const name = item.name

  const [editing, setEditing] = useState(0)
  const [newName, setNewName] = useState(name)

  const lostFocus = () => {
    updateName(newName, item.id)
    setEditing(0)
  }

  const textChange = (e) => {
    setNewName(e.target.value)
  }

  const onClick = () => {
    setEditing(1)
  }

  if(editing === 1) return <td><input className={item.colorClass} autoFocus onChange={textChange} onBlur={lostFocus} value={newName}></input></td>

  return ( 
    <td onClick={onClick}>{ name }</td>
   );
}
 
export default ItemName;