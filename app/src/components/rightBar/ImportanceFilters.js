import React, { useContext } from 'react';
import { FbContext } from '../../store/fbContext';



const ImportanceFilters = () => {

  const { dispatch, status, weights } = useContext(FbContext)
  var filters = []


  if(weights){
    weights.importanceArray.forEach(importance => {
      filters.push({
        id: importance.id,
        name: importance.name
      })
    })
  }else{
    return null
  }

  const onCheck = (e) => {
    dispatch({type: 'SET_IMPORTANCE_FILTER', importance: e.target.id, value: e.target.checked})
  }

  const selectAll = (e) => {
    dispatch({type: 'ALL_IMPORTANCE', value: true})
  }


  return ( 
    <div>
      <p className="text-xl font-bold">Filter Importance</p>
      <div className="flex space-x-2 flex-wrap">
        { filters.map(filt => {
          return(
            <div className="flex space-x-1" key={filt.id}>
              <input className="self-center" id={filt.id} onChange={onCheck} checked={!status.importanceFilters || status.importanceFilters[filt.id] === undefined ? true : status.importanceFilters[filt.id]} type="checkbox" />
              <label className="self-center">{filt.name}</label>
            </div>
          )
        })}
      </div>
      <button className="btn mt-2" onClick={selectAll}>Select All</button>
    </div>
   );
}
 
export default ImportanceFilters;