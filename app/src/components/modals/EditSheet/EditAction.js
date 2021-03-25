import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';


const EditAction = ({value, change}) => {
  return ( 
    <div className="mt-2">
      <p>Action</p>
      <TextareaAutosize id='action' onChange={change} className={'focus:outline-none border-2 border-black '} value={value}></TextareaAutosize>
    </div>
   );
}
 
export default EditAction;