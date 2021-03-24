import React, { useContext } from 'react'
import { FbContext } from '../../store/fbContext'


const ActionTypeFilter = () => {

  const { dispatch, status, weights } = useContext(FbContext)


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

    dispatch({type: 'SET_ACTION_FILTER', actionType: e.target.id, value: e.target.checked})
  }

  const selectAll = (e) => {
    dispatch({type: 'ALL_ACTION', value: true})
  }

  const deSelectAll = (e) => {
    dispatch({type: 'ALL_ACTION', value: false})
  }

  return ( 
    <div className="mt-5">
      <p className="text-xl font-bold">Filter Action Type</p>
      <div className="flex flex-col">
        { filters.map(filt => {
          return(
            <div className="flex space-x-1" key={filt.id}>
              <input className="self-center" id={filt.id} onChange={onCheck} checked={!status.actionFilters || status.actionFilters[filt.id] === undefined ? true : status.actionFilters[filt.id]} type="checkbox" />
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