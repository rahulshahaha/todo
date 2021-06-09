import React from 'react';
import LogoutIcon from '../icons/LogoutIcon';
import { logout } from '../../store/actions'

const Logout = () => {

  const logoutClick = (e) => {
    logout();
  }

  return ( 
    <LogoutIcon click={logoutClick} />
   );
}
 
export default Logout;