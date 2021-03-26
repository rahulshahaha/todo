import React, { useContext } from 'react';
import { FbContext } from '../../store/contexts/fbContext';
import { FilterContext } from '../../store/contexts/filterContext';
import ActionTypeFilter from './ActionTypeFilter';
import DayFilter from './DayFilter';
import ImportanceFilters from './ImportanceFilters';

const RightBar = () => {

  const { weights } = useContext(FbContext)
  const { filterDispatch } = useContext(FilterContext)
  const importances = weights ? weights.importanceTypes : {}
  const actionTypes = weights ? weights.actionTypes : {}


  const removeAllFilters = (e) => {
    filterDispatch({type: 'ALL_IMPORTANCE', value: true, importances})
    filterDispatch({type: 'ALL_ACTION', value: true, actionTypes})
    filterDispatch({type: 'SET_DAY_FILTER', value: 'all'})
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