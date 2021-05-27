import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';


const EditNotes = ({value, change}) => {
  return ( 
    <div className="mt-2">
      <p>Notes</p>
      <TextareaAutosize id='notes' onChange={change} className={'focus:outline-none border-2 border-black '} value={value}></TextareaAutosize>
    </div>
   );
}
 
export default EditNotes;