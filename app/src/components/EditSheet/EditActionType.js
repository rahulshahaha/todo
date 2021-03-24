import React, { useContext } from 'react';
import { FbContext } from '../../store/fbContext';

const EditActionType = ({value, change}) => {

  const { weights } = useContext(FbContext)

  var actionTypes = weights ? weights.actionTypeArray : null
  if(actionTypes){
    actionTypes = actionTypes.sort((a,b) => {
      return b.weight - a.weight
    })
  }

  return ( 
    <div className="mt-2">
      <p>Action Type</p>
      <select className='border-2 border-black' onChange={change} id='actionType' value={value}>
        { actionTypes && actionTypes.map(aType => {
          return <option value={aType.id}>{aType.name}</option> 
        })}
      </select>
    </div>
   );
}
 
export default EditActionType;