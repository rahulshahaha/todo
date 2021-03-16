import React, { useState } from 'react'
import { updateNotes } from '../../store/actions'


const ItemNotes = ({ item }) => {
  const notes = item.notes

  const [editing, setEditing] = useState(0)
  const [newNotes, setNewNotes] = useState(notes)

  const lostFocus = () => {
    updateNotes(newNotes, item.id)
    setEditing(0)
  }

  const textChange = (e) => {
    setNewNotes(e.target.value)
  }

  const onClick = () => {
    setEditing(1)
  }

  if(editing === 1) return <td><input className={item.colorClass} autoFocus onChange={textChange} onBlur={lostFocus} value={newNotes}></input></td>

  return ( 
    <td onClick={onClick}>{ notes }</td>
   );
}
 
export default ItemNotes;