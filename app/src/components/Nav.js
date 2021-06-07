import React, { useContext } from 'react'
import { StateContext } from '../store/contexts/stateContext'
import Login from './auth/Login'
import UpcomingWork from './centerColumn/UpcomingWork'
import AddItem from './leftBar/AddItem'
import { useLocation, NavLink } from 'react-router-dom'

const Nav = () => {

  const { showFilters, stateDispatch } = useContext(StateContext)
  const loc = useLocation()


  const to = () => {
    if(loc.pathname === '/working' || loc.pathname === '/'){
      return "/planning"
    }else{
      return "/working"
    }
  }

  const toggleFilter = (e) => {
    stateDispatch({type: 'TOGGLE_FILTERS'})
  }

  return ( 
    <div>
      <div className="bg-gray-400 w-full h-14 ">
        <div className="grid grid-cols-12">
          <div className="flex justify-between col-span-3 self-center justify-self-start p1-2">
            <Login />
            {/* <button className="btn" onClick={toggle}>Change View</button> */}
            <NavLink className="" to={to}><button className="btn">Change View</button></NavLink>
            <AddItem />
          </div>
          <div className="col-span-6">
            <UpcomingWork />
          </div>
          <div className="col-span-3 self-center justify-self-end pr-2">
            <button className="btn" onClick={toggleFilter}>{showFilters ? "Preview" : "Filter"}</button>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Nav;