import React, { useContext } from 'react'
import { FbContext } from '../store/contexts/fbContext';
import ItemRow from './ItemRow';

const Test = () => {

  const { items } = useContext(FbContext)


  return ( 
    <div>
      <table>
        <thead>
          <tr>
            {/* <th>Score</th> */}
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
          { items && items.map(item => {
            return <ItemRow key={item.id} item={item} />
          })}
        </tbody>
      </table>
    </div>
   );
}
 
export default Test;