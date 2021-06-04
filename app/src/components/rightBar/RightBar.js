import React, { useContext } from 'react';
import { DataContext } from '../../store/contexts/dataContext';
import { FbContext } from '../../store/contexts/fbContext';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PreviewDays from './preview/PreviewDays';
import Filters from './Filters';
import { StateContext } from '../../store/contexts/stateContext';

const RightBar = () => {

  const { FBuser } = useContext(FbContext)
  const { allLoaded } = useContext(DataContext)
  const { showFilters } = useContext(StateContext)

  if(!FBuser || !allLoaded){
    return null
  }


  return ( 
    <div className="col-span-3 max-h-screen">
      <div className="h-full">
        { showFilters ? 
          <Filters />
          :
          <DndProvider backend={HTML5Backend}>
            <PreviewDays />
          </DndProvider>
        }
      </div>
    </div>
   );
}
 
export default RightBar;