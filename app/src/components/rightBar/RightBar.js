import React, { useContext } from 'react';
import { FbContext } from '../../store/fbContext';
import ActionTypeFilter from './ActionTypeFilter';
import DayFilter from './DayFilter';
import ImportanceFilters from './ImportanceFilters';

const RightBar = () => {

  const { dispatch } = useContext(FbContext)

  const removeAllFilters = (e) => {
    dispatch({type: 'ALL_IMPORTANCE', value: true})
    dispatch({type: 'ALL_ACTION', value: true})
    dispatch({type: 'SET_DAY_FILTER', value: 'all'})
  }


  return ( 
    <div className=" col-span-3 p-5">
      <ImportanceFilters />
      <DayFilter />
      <ActionTypeFilter />
      <button onClick={removeAllFilters} className="importantBtn mt-10">Remove All Filters</button>
    </div>
   );
}
 
export default RightBar;