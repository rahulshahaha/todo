import React, { useContext } from 'react'
import { StateContext } from '../store/contexts/stateContext'
import Login from './auth/Login'
import AddItem from './leftBar/AddItem'

const Nav = () => {

  const { stateDispatch } = useContext(StateContext)


  const toggle = (e) => {
    stateDispatch({type: 'TOGGLE_VIEW'})
  }

  return ( 
    <div>
      <div className="bg-gray-400 w-full h-10">
        <Login />
        <button className="btn" onClick={toggle}>Change View</button>
        <AddItem />
      </div>
    </div>
   );
}
 
export default Nav;