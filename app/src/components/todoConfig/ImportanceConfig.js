import React, { useState, useEffect } from 'react';
import { updateImportanceTypes, addImportance } from '../../store/actions'

const ImportanceConfig = ({importanceTypes}) => {

  const [newITypes, setNewITypes] = useState([])

  useEffect(() => {
    if(importanceTypes){
      setNewITypes(importanceTypes)
    }
  },[importanceTypes])

  const inputChangeWeight = (e) => {
    setNewITypes({
      ...newITypes,
      [e.target.attributes.importanceid.nodeValue]: {
        ...newITypes[e.target.attributes.importanceid.nodeValue],
        weight: e.target.value
      }
    })
  }

  const inputChangeName = (e) => {
    setNewITypes({
      ...newITypes,
      [e.target.attributes.importanceid.nodeValue]: {
        ...newITypes[e.target.attributes.importanceid.nodeValue],
        name: e.target.value
      }
    })
  }

  const onBlurWeight = (e) => {
    const newValue = isNaN(parseFloat(e.target.value)) ? importanceTypes[e.target.attributes.importanceid.nodeValue].weight : parseFloat(e.target.value)
    updateImportanceTypes({
      ...newITypes,
      [e.target.attributes.importanceid.nodeValue]: {
        ...newITypes[e.target.attributes.importanceid.nodeValue],
        weight: newValue
      }
    }, importanceTypes)
  }

  const onBlurName = (e) => {
    const newValue = e.target.value === '' ? importanceTypes[e.target.attributes.importanceid.nodeValue].name : e.target.value
    updateImportanceTypes({
      ...newITypes,
      [e.target.attributes.importanceid.nodeValue]: {
        ...newITypes[e.target.attributes.importanceid.nodeValue],
        name: newValue
      }
    }, importanceTypes)
  }

  const addNew = (e) => {
    addImportance(importanceTypes)
  }

  const keys = Object.keys(newITypes)
  var importanceArray = []
  for (const key of keys) {
    importanceArray.push(newITypes[key])
  }
  importanceArray = importanceArray.sort((a,b) => {
    return b.weight - a.weight
  })

  return ( 
    <div className='m-auto w-56 mt-10'>
      <p className="text-lg font-bold">Importance Weights</p>
      <div className="flex flex-col space-y-1">
        { importanceArray && importanceArray.map(iType => {
          return(
            <div key={iType.id} className="grid grid-cols-12">
              <input onBlur={onBlurName} value={iType.name} onChange={inputChangeName} importanceid={iType.id} className="col-span-7 formInput"></input>
              <input onBlur={onBlurWeight} value={iType.weight} importanceid={iType.id} onChange={inputChangeWeight} className="formInputSmall col-span-4 col-start-9" />
            </div>
          )
        })}
      </div>
      <button onClick={addNew} className="btn mt-2">Add</button>
    </div>
   );
}
 
export default ImportanceConfig;