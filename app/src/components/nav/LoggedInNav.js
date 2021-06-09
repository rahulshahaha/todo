import React, { useContext } from 'react'
import UpcomingWork from '../centerColumn/UpcomingWork';
import AddItem from '../leftBar/AddItem';
import ToggleView from './ToggleView';
import { useLocation } from 'react-router-dom'
import { StateContext } from '../../store/contexts/stateContext';
import Logout from '../auth/Logout';


const LoggedInNav = () => {

  const { showFilters, stateDispatch } = useContext(StateContext)
  const loc = useLocation()

  const toggleFilter = (e) => {
    stateDispatch({type: 'TOGGLE_FILTERS'})
  }

  return ( 
    <div className="grid grid-cols-12">
      <div className="flex col-span-3 self-center justify-self-start space-x-4">
        <Logout />
        <ToggleView />
        <AddItem />
      </div>
      <div className="col-span-6">
        <UpcomingWork />
      </div>
      <div className="col-span-3 self-center justify-self-end">
        { loc.pathname !== "/planning" ? 
          <button className="btn" onClick={toggleFilter}>{showFilters ? "Preview" : "Filter"}</button>
        : null
        }
      </div>
    </div>
   );
}
 
export default LoggedInNav;