import React from 'react';

const EditActionType = ({value, change}) => {
  return ( 
    <div>
      <p>Action Type</p>
      <select className='border-2 border-black' onChange={change} id='actionType' value={value}>
        <option value={1}>ToDo</option>
        <option value={2}>Wait for Meeting</option>
        <option value={3}>Wait for Response</option>
        <option value={4}>Follow-up</option>
        <option value={5}>Nothing yet</option>
        <option value={6}>Fully done</option>
      </select>
    </div>
   );
}
 
export default EditActionType;