import React from 'react'
import PlanningWeek from './planningView/PlanningWeek'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const PlanningView = () => {


  return ( 
    <div className="overflow-scroll h-screen">
      <DndProvider backend={HTML5Backend}>
        <PlanningWeek week={0} />
        <PlanningWeek week={1} />
      </DndProvider>
    </div>
   );
}
 
export default PlanningView;