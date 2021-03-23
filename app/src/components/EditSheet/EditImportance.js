import React from 'react'


const EditImportance = ({value, change}) => {
  return ( 
    <div className="mt-2">
      <p>Importance</p>
      <select className='border-2 border-black' id='importance' onChange={change} value={value}>
        <option value={1}>High</option>
        <option value={2}>Medium</option>
        <option value={3}>Low</option>
      </select>
    </div>
   );
}
 
export default EditImportance;