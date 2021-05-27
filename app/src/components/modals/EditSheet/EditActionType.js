import React, { useContext, useState } from 'react';
import { DataContext } from '../../../store/contexts/dataContext';

const EditActionType = ({value, change}) => {

  const { weights } = useContext(DataContext)
  const [editing, setEditing] = useState(false)


  var actionTypes = weights ? weights.actionTypeArray : null
  if(actionTypes){
    actionTypes = actionTypes.sort((a,b) => {
      return b.weight - a.weight
    })
  }

  const actionType = actionTypes ? actionTypes.filter(aType => {
    return aType.id === value
  })[0] : null;

  const click = (e) => {
    setEditing(!editing)
  }

  const changed = (e) => {
    change(e)
    setEditing(false)
  }

  return ( 
    <div className="mt-5">
      { editing ? 
        <select autoFocus onBlur={click} onClick={click} size={5} className='border-2 border-black' onChange={changed} id='actionType' value={value}>
          { actionTypes && actionTypes.map(aType => {
            return <option key={aType.id} value={aType.id}>{aType.name}</option> 
          })}
        </select>
        :
        <p className="font-bold text-md inline-block cursor-pointer hover:underline" onClick={click} >{actionType.name}:</p>
      }

    </div>
   );
}
 
export default EditActionType;