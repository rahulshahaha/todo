import React, { useContext } from 'react'
import { StateContext } from '../store/contexts/stateContext'
import Login from './auth/Login'
import UpcomingWork from './centerColumn/UpcomingWork'
import AddItem from './leftBar/AddItem'
import { useLocation } from 'react-router-dom'
import ToggleView from './ToggleView'

const Nav = () => {

  const { showFilters, stateDispatch } = useContext(StateContext)
  const loc = useLocation()




  const toggleFilter = (e) => {
    stateDispatch({type: 'TOGGLE_FILTERS'})
  }

  return ( 
    <div>
      <div className="bg-darkGray w-full h-14 ">
        <div className="grid grid-cols-12">
          <div className="flex col-span-3 self-center justify-self-start pl-2 space-x-4">
            <Login />
            <ToggleView />
            <AddItem />
          </div>
          <div className="col-span-6">
            <UpcomingWork />
          </div>
          <div className="col-span-3 self-center justify-self-end pr-2">
            { loc.pathname !== "/planning" ? 
              <button className="btn" onClick={toggleFilter}>{showFilters ? "Preview" : "Filter"}</button>
            : null
            }
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Nav;