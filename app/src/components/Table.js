import React, { useContext } from 'react'
import { FbContext } from '../store/fbContext';
import ItemRow from './ItemRow';

const Table = () => {

  const { items } = useContext(FbContext)
  const sortedItems = items ? items.sort((a,b) => {
    return b.score - a.score
  }) : null;


  return ( 
    <div>
      <table>
        <thead>
          <tr>
            <th>Score</th>
            <th>Name</th>
            <th>Importance</th>
            <th>Description</th>
            <th>Notes</th>
            <th>Action Type</th>
            <th>Action</th>
            <th>Expected Update</th>
          </tr>
        </thead>
        <tbody>
          { sortedItems && sortedItems.map(item => {
            return <ItemRow key={item.id} item={item} />
          })}
        </tbody>
      </table>
    </div>
   );
}
 
export default Table;