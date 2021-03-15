import React from 'react'
import moment from 'moment';
import { useImportance } from '../hooks/useImportance'


const ItemRow = ({ item }) => {

  const importanceName = useImportance(item.importance)


  return ( 
    <tr>
      <td>{item.name}</td>
      <td>{importanceName}</td>
      <td>{item.description}</td>
      <td>{item.notes}</td>
      <td>{item.actionType}</td>
      <td>{item.action}</td>
      <td>{moment.unix(item.expectedUpdate.seconds).format("M/DD/YYYY")}</td>
    </tr>
   );
}
 
export default ItemRow;