import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';


const EditDescription = ({value, change}) => {

  return ( 
    <div>
      <p>Description</p>
      <TextareaAutosize id='description' onChange={change} className={'focus:outline-none border-2 border-black '} value={value}></TextareaAutosize>
    </div>
   );
}
 
export default EditDescription;