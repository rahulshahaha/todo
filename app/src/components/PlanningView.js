import React, { useContext, useEffect } from 'react'
import PlanningWeek from './planningView/PlanningWeek'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { FilterContext } from '../store/contexts/filterContext'
import { DataContext } from '../store/contexts/dataContext'

const PlanningView = () => {

  const { filterDispatch } = useContext(FilterContext)
  const { weights } = useContext(DataContext)



  useEffect(() => {
    const importances = weights ? weights.importanceTypes : {}
    const actionTypes = weights ? weights.actionTypes : {}
    filterDispatch({type: 'ALL_IMPORTANCE', value: true, importances})
    filterDispatch({type: 'ALL_ACTION', value: true, actionTypes})
    filterDispatch({type: 'SET_DAY_FILTER', value: 'all'})
  }, [filterDispatch, weights])




  return ( 
    <div className="overflow-scroll max-h-screen pb-10 h-screen">
      <DndProvider backend={HTML5Backend}>
        <PlanningWeek week={0} />
        <PlanningWeek week={1} />
      </DndProvider>
    </div>
   );
}
 
export default PlanningView;