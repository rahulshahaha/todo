import React, { useState, useEffect } from 'react'
import { updateActionTypes, addActionType } from '../../../store/actions'

const ActionConfig = ({actionTypes}) => {

  const [newATypes, setNewATypes] = useState([])

  useEffect(() => {
    if(actionTypes){
      setNewATypes(actionTypes)
    }
  },[actionTypes])


  const inputChangeWeight = (e) => {
    setNewATypes({
      ...newATypes,
      [e.target.attributes.actionid.nodeValue]: {
        ...newATypes[e.target.attributes.actionid.nodeValue],
        weight: e.target.value
      }
    })
  }

  const inputChangeName = (e) => {
    setNewATypes({
      ...newATypes,
      [e.target.attributes.actionid.nodeValue]: {
        ...newATypes[e.target.attributes.actionid.nodeValue],
        name: e.target.value
      }
    })
  }

  const onBlurWeight = (e) => {
    const newValue = isNaN(parseFloat(e.target.value)) ? actionTypes[e.target.attributes.actionid.nodeValue].weight : parseFloat(e.target.value)
    updateActionTypes({
      ...newATypes,
      [e.target.attributes.actionid.nodeValue]: {
        ...newATypes[e.target.attributes.actionid.nodeValue],
        weight: newValue
      }
    }, actionTypes)
  }

  const onBlurName = (e) => {
    const newValue = e.target.value === '' ? actionTypes[e.target.attributes.actionid.nodeValue].name : e.target.value
    if(newValue !== actionTypes[e.target.attributes.actionid.nodeValue].name){
      updateActionTypes({
        ...newATypes,
        [e.target.attributes.actionid.nodeValue]: {
          ...newATypes[e.target.attributes.actionid.nodeValue],
          name: newValue
        }
      }, actionTypes)
    }
  }


  const addAction = (e) => {
    addActionType(actionTypes)
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
              {/* <p className="col-span-8">{aType.name}</p> */}
              <input onBlur={onBlurName} onChange={inputChangeName} actionid={aType.id} value={aType.name} className="col-span-7 formInput"></input>
              <input onBlur={onBlurWeight} value={aType.weight} actionid={aType.id} id={aType.id} onChange={inputChangeWeight} className="formInputSmall col-span-4 col-start-9" />
            </div>
          )
        })}
      </div>
      <button className="btn mt-2" onClick={addAction}>Add</button>
    </div>
   );
}
 
export default ActionConfig;