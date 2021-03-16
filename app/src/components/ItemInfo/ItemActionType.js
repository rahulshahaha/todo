import React from 'react'
import { updateActionType } from '../../store/actions'


const ItemActionType = ({ item }) => {

  const actionType = item.actionType

  const selectChange = (e) => {
    updateActionType(e.target.value, item.id)
  }

  return ( 
    <td>
      <select className={item.colorClass} onChange={selectChange} value={actionType}>
        <option value={1}>ToDo</option>
        <option value={2}>Wait for Meeting</option>
        <option value={3}>Wait for Response</option>
        <option value={4}>Follow-up</option>
        <option value={5}>Nothing yet</option>
        <option value={6}>Fully done</option>
      </select>
    </td>
   );
}
 
export default ItemActionType;