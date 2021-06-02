import React, { useContext } from 'react';
import { DataContext } from '../../store/contexts/dataContext';
import { FbContext } from '../../store/contexts/fbContext';
import { FilterContext } from '../../store/contexts/filterContext';
import ActionTypeFilter from './ActionTypeFilter';
import DayFilter from './DayFilter';
import ImportanceFilters from './ImportanceFilters';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PreviewDays from './PreviewDays';
import { StateContext } from '../../store/contexts/stateContext';

const RightBar = () => {

  const { weights, allLoaded } = useContext(DataContext)
  const { filterDispatch } = useContext(FilterContext)
  const { FBuser } = useContext(FbContext)
  const importances = weights ? weights.importanceTypes : {}
  const actionTypes = weights ? weights.actionTypes : {}

  const { showFilters, stateDispatch } = useContext(StateContext)



  const removeAllFilters = (e) => {
    filterDispatch({type: 'ALL_IMPORTANCE', value: true, importances})
    filterDispatch({type: 'ALL_ACTION', value: true, actionTypes})
    filterDispatch({type: 'SET_DAY_FILTER', value: 'all'})
  }

  if(!FBuser || !allLoaded){
    return null
  }

  const toggleFilters = (e) => {
    // setCollapseFilters(!collapseFilters)
    stateDispatch({type: 'TOGGLE_FILTERS'})
  }

  return ( 
    <div className="col-span-3 p-5 h-screen overflow-hidden pb-10">
      <div className="overflow-scroll h-full hideBar">
        <p onClick ={toggleFilters} className="cursor-pointer underline">{showFilters ? "Hide Filters" : "Show Filters"}</p>
        { showFilters ? 
          <div className="">
            <ImportanceFilters />
            <DayFilter />
            <ActionTypeFilter />
            <button onClick={removeAllFilters} className="importantBtn mt-10">Remove All Filters</button>
          </div>
          : null
        }
        <DndProvider backend={HTML5Backend}>
          <PreviewDays />
        </DndProvider>
      </div>
    </div>
   );
}
 
export default RightBar;