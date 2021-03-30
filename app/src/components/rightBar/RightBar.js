import React, { useContext } from 'react';
import { DataContext } from '../../store/contexts/dataContext';
import { FbContext } from '../../store/contexts/fbContext';
import { FilterContext } from '../../store/contexts/filterContext';
import ActionTypeFilter from './ActionTypeFilter';
import DayFilter from './DayFilter';
import ImportanceFilters from './ImportanceFilters';

const RightBar = () => {

  const { weights, allLoaded } = useContext(DataContext)
  const { filterDispatch } = useContext(FilterContext)
  const { FBuser } = useContext(FbContext)
  const importances = weights ? weights.importanceTypes : {}
  const actionTypes = weights ? weights.actionTypes : {}


  const removeAllFilters = (e) => {
    filterDispatch({type: 'ALL_IMPORTANCE', value: true, importances})
    filterDispatch({type: 'ALL_ACTION', value: true, actionTypes})
    filterDispatch({type: 'SET_DAY_FILTER', value: 'all'})
  }

  if(!FBuser || !allLoaded){
    return null
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