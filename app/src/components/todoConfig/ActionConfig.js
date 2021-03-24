import React, { useState, useEffect } from 'react'
import { updateActionTypes } from '../../store/actions'

const ActionConfig = ({actionTypes}) => {

  const [newATypes, setNewATypes] = useState([])

  useEffect(() => {
    if(actionTypes){
      setNewATypes(actionTypes)
    }
  },[actionTypes])


  const inputChange = (e) => {
    setNewATypes({
      ...newATypes,
      [e.target.attributes.actionid.nodeValue]: {
        ...newATypes[e.target.attributes.actionid.nodeValue],
        weight: e.target.value
      }
    })
  }

  const onBlur = (e) => {
    const newValue = isNaN(parseFloat(e.target.value)) ? actionTypes[e.target.attributes.actionid.nodeValue].weight : parseFloat(e.target.value)
    updateActionTypes({
      ...newATypes,
      [e.target.attributes.actionid.nodeValue]: {
        ...newATypes[e.target.attributes.actionid.nodeValue],
        weight: newValue
      }
    }, actionTypes)
  }


  const keys = Object.keys(newATypes)
  var actionArray = []
  for (const key of keys) {
    actionArray.push(newATypes[key])
  }
  actionArray = actionArray.sort((a,b) => {
    return b.weight - a.weight
  })

  return ( 
    <div className='m-auto w-56 mt-10'>
      <p className="text-lg font-bold">Action Type Weights</p>
      <div className="flex flex-col space-y-1">
        { actionArray && actionArray.map(aType => {
          return(
            <div key={aType.id} className="grid grid-cols-12">
              <p className="col-span-8">{aType.name}</p>
              <input onBlur={onBlur} value={aType.weight} actionid={aType.id} id={aType.id} onChange={inputChange} className="formInputSmall col-span-4" />
            </div>
          )
        })}
      </div>
    </div>
   );
}
 
export default ActionConfig;