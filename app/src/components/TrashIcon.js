import React from 'react';
import { deleteItem } from '../store/actions'

const TrashIcon = ({itemID}) => {

  const clicked = (e) => {
    console.log('delete')
    if(window.confirm('Are you sure you want to delete?') === true){
      deleteItem(itemID)
    }
  }

  return ( 
    <div>
      <svg onClick={clicked} className="trashIcon hidden absolute right-0 w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </div>
   );
}
 
export default TrashIcon;