import React, { useContext, useState } from 'react';
import { DataContext } from '../../../store/contexts/dataContext';
import Select from 'react-select'

const EditActionType = ({value, change}) => {

  const { weights } = useContext(DataContext)
  const [editing, setEditing] = useState(false)


  var actionTypes = weights ? weights.actionTypeArray : null
  if(actionTypes){
    actionTypes = actionTypes.sort((a,b) => {
      return b.weight - a.weight
    })
  }

  const options = []
  actionTypes.forEach(aType => {
    options.push({
      value: aType.id,
      label: aType.name
    })
  })

  const actionType = actionTypes ? actionTypes.filter(aType => {
    return aType.id === parseInt(value)
  })[0] : null;


  const click = (e) => {
    setEditing(!editing)
  }

  const changed = (e) => {
    const data = {
      target: {
        id: 'actionType',
        value: e.value
      }
    }
    change(data)
    setEditing(false)
  }

  return ( 
    <div className="mt-5">
      { editing ? 
        <Select className="w-1/2" options={options} id='actionType' onBlur={click} onClick={click} placeholder={actionType.name} onChange={changed} autoFocus={true} maxMenuHeight={200} menuIsOpen={true} controlShouldRenderValue={true} />
        :
        <p className="font-bold text-md inline-block cursor-pointer hover:underline" onClick={click} >{actionType ? actionType.name : ""}:</p>
      }

    </div>
   );
}
 
export default EditActionType;