import React from 'react'
import { completeOneOff } from '../../../store/actions'

const OneOffItem = ({oneOff}) => {

  const onCheck = () => {
    completeOneOff(oneOff.id)
  }

  return (
    <div className="flex space-x-2 bg-gray-100 my-1">
      <input className='self-center' onChange={onCheck} type="checkbox" />
      <label className='self-center'>{oneOff.name}</label>
    </div>
   );
}
 
export default OneOffItem;