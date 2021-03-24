import React, { useContext } from 'react';
import { FbContext } from '../../store/fbContext';



const ImportanceFilters = () => {

  const { dispatch, status, weights } = useContext(FbContext)
  var filters = []


  if(weights){
    weights.importanceArray.forEach(importance => {
      filters.push({
        id: importance.id,
        name: importance.name,
        weight: importance.weight
      })
    })
    filters = filters.sort((a,b) => {
      return b.weight - a.weight
    })
  }else{
    return null
  }

  const onCheck = (e) => {
    dispatch({type: 'SET_IMPORTANCE_FILTER', importance: e.target.id, value: e.target.checked})
  }

  const selectAll = (e) => {
    dispatch({type: 'ALL_IMPORTANCE', value: true, importances: weights.importanceTypes})
  }

  const deSelectAll = (e) => {
    dispatch({type: 'ALL_IMPORTANCE', value: false, importances: weights.importanceTypes})
  }


  return ( 
    <div>
      <p className="text-xl font-bold">Filter Importance</p>
      <div className="flex flex-col">
        { filters.map(filt => {
          return(
            <div className="flex space-x-1" key={filt.id}>
              <input className="self-center" id={filt.id} onChange={onCheck} checked={!status.importanceFilters || status.importanceFilters[filt.id] === undefined ? true : status.importanceFilters[filt.id]} type="checkbox" />
              <label className="self-center">{filt.name}</label>
            </div>
          )
        })}
      </div>
      <div className="flex space-x-2">
        <button className="btn mt-2" onClick={selectAll}>Select All</button>
        <button className="btn mt-2" onClick={deSelectAll}>De-select All</button>
      </div>
    </div>
   );
}
 
export default ImportanceFilters;