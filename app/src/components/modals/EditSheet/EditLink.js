import React, { useState } from 'react'
import PencilIcon from '../../icons/PencilIcon'



const EditLink = ({value, change}) => {

  const [editing, setEditing] = useState(false)

  const toggleEditing = (e) => {
    setEditing(!editing)
  }

  const focus = (e) => {
    e.target.select()
  }

  if(value === "" && !editing){
    return(
      <div className="mt-2">
        <p className="italic text-gray-500 cursor-pointer underline inline-block" onClick={toggleEditing}>{"Add Link"}</p>
      </div>
    )
  }

  if(editing){
    return(
      <div className="mt-2">
        <input placeholder="Enter URL" id='link' autoFocus onFocus={focus} onBlur={toggleEditing} onChange={change} value={value} />
      </div>
    )
  }

  return ( 
    <div className="mt-2">
      <div className="flex space-x-1">
        <a target="_blank" rel="noreferrer" href={value} className="text-blue-500 underline text-md font-bold">Link</a>
        <div onClick={toggleEditing} className="w-4 h-4 cursor-pointer self-center">
          <PencilIcon />
        </div>
      </div>
    </div>
   );
}
 
export default EditLink;