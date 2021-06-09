import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import CalendarIcon from '../icons/CalendarIcon'
import ListIcon from '../icons/ListIcon'


const ToggleView = () => {

  const loc = useLocation()


  const to = () => {
    if(loc.pathname === '/working' || loc.pathname === '/'){
      return "/planning"
    }else{
      return "/working"
    }
  }

  if(loc.pathname === '/planning'){
    return ( 
      <NavLink className="" to={to}><ListIcon /></NavLink>
     );
  }

  return ( 
    <NavLink className="" to={to}><CalendarIcon /></NavLink>
   );
}
 
export default ToggleView;