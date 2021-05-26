import React, { useState } from 'react'
import { completeOneOff, updateOneOff } from '../../../store/actions'

const OneOffItem = ({oneOff}) => {

  const [editing,setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(oneOff.name)

  const onCheck = () => {
    completeOneOff(oneOff.id)
  }

  const double = (e) => {
    setEditing(!editing)
  }

  const change = (e) => {
    setInputValue(e.target.value)
  }

  const blur = (e) => {
    updateOneOff(e.target.value, oneOff.id)
    setEditing(false)
  }

  return (
    <div onDoubleClick = {double} className="flex space-x-2 bg-gray-100 my-1">
      <input className='self-center' onChange={onCheck} type="checkbox" />
      { editing ? 
        <input autoFocus onBlur={blur} onChange={change} value={inputValue}></input>
        :
        <label className='self-center'>{oneOff.name}</label>
      }
    </div>
   );
}
 
export default OneOffItem;