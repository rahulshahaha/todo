import React from 'react'
import { completeOneOff } from '../../store/actions'

const OneOffItem = ({oneOff}) => {

  const onCheck = () => {
    completeOneOff(oneOff.id)
  }

  return (
    <div className="flex">
      <input onChange={onCheck} type="checkbox" />
      <p>{oneOff.name}</p>
    </div>
   );
}
 
export default OneOffItem;