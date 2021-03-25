import React, { useContext } from 'react';
import { FbContext } from '../../store/fbContext';
import ActionTypeFilter from './ActionTypeFilter';
import DayFilter from './DayFilter';
import ImportanceFilters from './ImportanceFilters';

const RightBar = () => {

  const { dispatch, weights } = useContext(FbContext)
  const importances = weights ? weights.importanceTypes : {}
  const actionTypes = weights ? weights.actionTypes : {}


  const removeAllFilters = (e) => {
    dispatch({type: 'ALL_IMPORTANCE', value: true, importances})
    dispatch({type: 'ALL_ACTION', value: true, actionTypes})
    dispatch({type: 'SET_DAY_FILTER', value: 'all'})
  }


  return ( 
    <div className="col-span-3 p-5 h-screen overflow-hidden">
      <ImportanceFilters />
      <DayFilter />
      <ActionTypeFilter />
      <button onClick={removeAllFilters} className="importantBtn mt-10">Remove All Filters</button>
    </div>
   );
}
 
export default RightBar;