import React from 'react'


const EditName = ({value, change}) => {
  return ( 
    <div>
      <p>Item Name</p>
      <input className='formInput' onChange={change} id='name' value={value}></input>
    </div>
   );
}
 
export default EditName;