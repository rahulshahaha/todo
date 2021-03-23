import React, { useContext } from 'react'
import { FbContext } from '../../store/fbContext'


const ActionTypeFilter = () => {

  const { dispatch, status } = useContext(FbContext)



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
        <div className="flex space-x-1">
          <input className="self-center" id={1} onChange={onCheck} checked={status.actionFilters[1]} type="checkbox" />
          <label className="self-center">ToDo</label>
        </div>
        <div className="flex space-x-1">
          <input className="self-center" id={2} onChange={onCheck} checked={status.actionFilters[2]} type="checkbox" />
          <label className="self-center">Wait for Meeting</label>
        </div>
        <div className="flex space-x-1">
          <input className="self-center" id={3} onChange={onCheck} checked={status.actionFilters[3]} type="checkbox" />
          <label className="self-center">Wait for Response</label>
        </div>
        <div className="flex space-x-1">
          <input className="self-center" id={4} onChange={onCheck} checked={status.actionFilters[4]} type="checkbox" />
          <label className="self-center">Follow-up</label>
        </div>
        <div className="flex space-x-1">
          <input className="self-center" id={5} onChange={onCheck} checked={status.actionFilters[5]} type="checkbox" />
          <label className="self-center">Nothing Yet</label>
        </div>
        <div className="flex space-x-1">
          <input className="self-center" id={6} onChange={onCheck} checked={status.actionFilters[6]} type="checkbox" />
          <label className="self-center">Fully Done</label>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="btn mt-2" onClick={selectAll}>Select All</button>
        <button className="btn mt-2" onClick={deSelectAll}>De-select All</button>
      </div>
    </div>
   );
}
 
export default ActionTypeFilter;