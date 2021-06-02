import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';


const EditAction = ({value, change}) => {
  const [editing, setEditing] = useState(false)

  const click = (e) => {
    setEditing(!editing)
  }

  const focus = (e) => {
    e.target.select()
  }

  return ( 
    <div className="">
      { editing ? 
        <TextareaAutosize onFocus={focus} onBlur={click} autoFocus id='action' onChange={change} className={'focus:outline-none border-2 border-black '} value={value}></TextareaAutosize>
        :
        value === "" ? 
        <p className="italic text-gray-500 cursor-pointer underline inline-block" onClick={click}>{"Add Action"}</p>
        :
        <p className="cursor-pointer hover:underline inline-block" onClick={click}>{value}</p>
      }
    </div>
   );
}
 
export default EditAction;