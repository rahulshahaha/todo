import React, { useState, useEffect } from 'react';
import { updateImportanceTypes } from '../../store/actions'

const ImportanceConfig = ({importanceTypes}) => {

  const [newITypes, setNewITypes] = useState([])

  useEffect(() => {
    if(importanceTypes){
      setNewITypes(importanceTypes)
    }
  },[importanceTypes])

  const inputChange = (e) => {
    setNewITypes({
      ...newITypes,
      [e.target.attributes.importanceid.nodeValue]: {
        ...newITypes[e.target.attributes.importanceid.nodeValue],
        weight: e.target.value
      }
    })
  }

  const onBlur = (e) => {
    const newValue = isNaN(parseFloat(e.target.value)) ? importanceTypes[e.target.attributes.importanceid.nodeValue].weight : parseFloat(e.target.value)
    updateImportanceTypes({
      ...newITypes,
      [e.target.attributes.importanceid.nodeValue]: {
        ...newITypes[e.target.attributes.importanceid.nodeValue],
        weight: newValue
      }
    }, importanceTypes)
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
              <p className="col-span-8">{iType.name}</p>
              <input onBlur={onBlur} value={iType.weight} importanceid={iType.id} onChange={inputChange} className="formInputSmall col-span-4" />
            </div>
          )
        })}
      </div>
    </div>
   );
}
 
export default ImportanceConfig;