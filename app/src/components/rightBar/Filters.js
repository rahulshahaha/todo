import React, { useContext } from 'react'
import { DataContext } from '../../store/contexts/dataContext';
import { FilterContext } from '../../store/contexts/filterContext';
import ActionTypeFilter from './ActionTypeFilter';
import DayFilter from './DayFilter';
import ImportanceFilters from './ImportanceFilters';


const Filters = () => {

  const { filterDispatch } = useContext(FilterContext)
  const { weights } = useContext(DataContext)
  const importances = weights ? weights.importanceTypes : {}
  const actionTypes = weights ? weights.actionTypes : {}


  const removeAllFilters = (e) => {
    filterDispatch({type: 'ALL_IMPORTANCE', value: true, importances})
    filterDispatch({type: 'ALL_ACTION', value: true, actionTypes})
    filterDispatch({type: 'SET_DAY_FILTER', value: 'all'})
  }

  return ( 
    <div className="mb-10 p-2">
      <ImportanceFilters />
      <DayFilter />
      <ActionTypeFilter />
      <button onClick={removeAllFilters} className="doneBtn mt-10">Clear Filters</button>
    </div>
   );
}
 
export default Filters;