import React, { useState } from 'react';
import { updateImportanceTypes } from '../../store/actions'

const ImportanceConfig = ({importanceTypes}) => {

  const iTypes = importanceTypes;
  const [newITypes, setNewITypes] = useState([])

  const inputChange = (e) => {
    var found = false;
    const iT = newITypes
    for(var i = 0; i < iT.length; i++){
      if(iT[i].id === parseInt(e.target.id)){
        found = true;
        iT[i] = {
          id: iT[i].id,
          weight: e.target.value
        }
      }
    }

    if(found){
      setNewITypes(iT)
    }else{
      iT.push({
        id: parseInt(e.target.id),
        weight: e.target.value
      })
    }
  }

  const changeITypes = () => {
    updateImportanceTypes(newITypes)
  }

  return ( 
    <div>
      { iTypes && iTypes.map(iType => {
        return(
          <div key={iType.id}>
            <p>{iType.name}</p>
            <input defaultValue={iType.weight} id={iType.id} onChange={inputChange} className="formInput" />
          </div>
        )
      })}
      <button className='btn' onClick={changeITypes}>Change</button>
    </div>
   );
}
 
export default ImportanceConfig;