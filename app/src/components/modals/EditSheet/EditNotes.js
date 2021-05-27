import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';


const EditNotes = ({value, change}) => {
  const [editing, setEditing] = useState(false)

  const click = (e) => {
    setEditing(!editing)
  }

  const focus = (e) => {
    e.target.select()
  }



  return ( 
    <div className="mt-2">
      <p className="text-md font-bold">Notes</p>
      { editing ?
        <TextareaAutosize id='notes' autoFocus onBlur={click} onFocus={focus} onChange={change} className={'focus:outline-none border-2 border-black '} value={value}></TextareaAutosize>
        :
        value === "" ? 
        <p className="italic text-gray-500 cursor-pointer underline inline-block" onClick={click}>{"Add Note"}</p>
        :
        <p className="cursor-pointer hover:underline inline-block" onClick={click}>{value}</p>
      }
    </div>
   );
}
 
export default EditNotes;