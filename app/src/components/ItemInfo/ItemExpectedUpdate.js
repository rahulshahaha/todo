import React, { useState } from 'react'
import { updateExpectedUpdate } from '../../store/actions'
import moment from 'moment';

const ItemExpectedUpdate = ({ item }) => {
  const expectedUpdate = moment.unix(item.expectedUpdate.seconds).format("L")
  
  const [editing, setEditing] = useState(0)
  const [newExpectedUpdate, setNewExpectedUpdate] = useState(expectedUpdate)

  const lostFocus = () => {
    const newDateMoment = moment(newExpectedUpdate, "L");
    const newDate = new Date(newDateMoment.year(), newDateMoment.month(), newDateMoment.date())
    updateExpectedUpdate(newDate, item.id)
    setEditing(0)
  }

  const textChange = (e) => {
    setNewExpectedUpdate(e.target.value)
  }

  const onClick = () => {
    setEditing(1)
  }

  if(editing === 1) return <td><input className={item.colorClass} autoFocus onChange={textChange} onBlur={lostFocus} value={newExpectedUpdate}></input></td>

  return ( 
    <td onClick={onClick}>{ expectedUpdate }</td>
   );
}
 
export default ItemExpectedUpdate;