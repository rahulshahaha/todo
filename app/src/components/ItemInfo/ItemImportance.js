import React from 'react'
import { updateImportance } from '../../store/actions'


const ItemImportance = ({ item }) => {

  const importance = item.importance
  // const [newImportance, setNewImportance] = useState(importance)

  const selectChange = (e) => {
    updateImportance(e.target.value, item.id)
  }

  return ( 
    <td>
      <select className={item.colorClass} onChange={selectChange} value={importance}>
        <option value={1}>High</option>
        <option value={2}>Medium</option>
        <option value={3}>Low</option>
      </select>
    </td>
   );
}
 
export default ItemImportance;