import React, { useContext } from 'react';
import { FbContext } from '../../store/fbContext';



const ImportanceFilters = () => {

  const { dispatch, status } = useContext(FbContext)


  const onCheck = (e) => {
    dispatch({type: 'SET_IMPORTANCE_FILTER', importance: e.target.id, value: e.target.checked})
  }

  const selectAll = (e) => {
    dispatch({type: 'ALL_IMPORTANCE', value: true})
  }

  return ( 
    <div>
      <p className="text-xl font-bold">Filter Importance</p>
      <div className="flex space-x-2">
        <div className="flex space-x-1">
          <input className="self-center" id={1} onChange={onCheck} checked={status.importanceFilters[1]} type="checkbox" />
          <label className="self-center">High</label>
        </div>
        <div className="flex space-x-1">
          <input className="self-center" id={2} onChange={onCheck} checked={status.importanceFilters[2]} type="checkbox" />
          <label className="self-center">Medium</label>
        </div>
        <div className="flex space-x-1">
          <input className="self-center" id={3} onChange={onCheck} checked={status.importanceFilters[3]} type="checkbox" />
          <label className="self-center">Low</label>
        </div>
      </div>
      <button className="btn mt-2" onClick={selectAll}>Select All</button>
    </div>
   );
}
 
export default ImportanceFilters;