import React, { useContext } from 'react';
import { FbContext } from '../../store/contexts/fbContext';
import { FilterContext } from '../../store/contexts/filterContext';



const ImportanceFilters = () => {

  const { weights } = useContext(FbContext)
  const { filterDispatch, filterData } = useContext(FilterContext)
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
    filterDispatch({type: 'SET_IMPORTANCE_FILTER', importance: e.target.id, value: e.target.checked})
  }

  const selectAll = (e) => {
    filterDispatch({type: 'ALL_IMPORTANCE', value: true, importances: weights.importanceTypes})
  }

  const deSelectAll = (e) => {
    filterDispatch({type: 'ALL_IMPORTANCE', value: false, importances: weights.importanceTypes})
  }


  return ( 
    <div>
      <p className="text-xl font-bold">Filter Importance</p>
      <div className="flex flex-col">
        { filters.map(filt => {
          return(
            <div className="flex space-x-1" key={filt.id}>
              <input className="self-center" id={filt.id} onChange={onCheck} checked={!filterData.importanceFilters || filterData.importanceFilters[filt.id] === undefined ? true : filterData.importanceFilters[filt.id]} type="checkbox" />
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