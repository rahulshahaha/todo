import React, { useContext } from 'react'
import { StateContext } from '../store/contexts/stateContext'
import Login from './auth/Login'
import AddItem from './leftBar/AddItem'

const Nav = () => {

  const { showFilters, stateDispatch } = useContext(StateContext)


  const toggle = (e) => {
    stateDispatch({type: 'TOGGLE_VIEW'})
  }

  const toggleFilter = (e) => {
    stateDispatch({type: 'TOGGLE_FILTERS'})
  }

  return ( 
    <div>
      <div className="bg-gray-400 w-full h-10">
        <div className="flex justify-between mx-5">
          <div>
            <Login />
            <button className="btn" onClick={toggle}>Change View</button>
            <AddItem />
          </div>
          <div>
            <button className="btn" onClick={toggleFilter}>{showFilters ? "Preview" : "Filter"}</button>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Nav;