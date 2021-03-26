import React, { useContext } from 'react'
import { FbContext } from '../../store/contexts/fbContext'
import { FilterContext } from '../../store/contexts/filterContext'


const ActionTypeFilter = () => {

  const { weights } = useContext(FbContext)
  const { filterData, filterDispatch } = useContext(FilterContext)


  var filters = []
  if(weights){
    weights.actionTypeArray.forEach(aType => {
      filters.push({
        id: aType.id,
        name: aType.name
      })
    })
  }else{
    return null
  }


  const onCheck = (e) => {
    filterDispatch({type: 'SET_ACTION_FILTER', actionType: e.target.id, value: e.target.checked})
  }

  const selectAll = (e) => {
    filterDispatch({type: 'ALL_ACTION', value: true, actionTypes: weights.actionTypes})
  }

  const deSelectAll = (e) => {
    filterDispatch({type: 'ALL_ACTION', value: false, actionTypes: weights.actionTypes})
  }

  return ( 
    <div className="mt-5">
      <p className="text-xl font-bold">Filter Action Type</p>
      <div className="flex flex-col">
        { filters.map(filt => {
          return(
            <div className="flex space-x-1" key={filt.id}>
              <input className="self-center" id={filt.id} onChange={onCheck} checked={!filterData.actionFilters || filterData.actionFilters[filt.id] === undefined ? true : filterData.actionFilters[filt.id]} type="checkbox" />
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
 
export default ActionTypeFilter;