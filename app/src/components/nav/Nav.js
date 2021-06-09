import React, { useContext } from 'react'
import { FbContext } from '../../store/contexts/fbContext';
import LoggedInNav from './LoggedInNav'
import LoggedOutNav from './LoggedOutNav';

const Nav = () => {

const { FBuser } = useContext(FbContext)


  return ( 
    <div className="">
      <div className="bg-darkGray w-full h-14 px-2">
        { FBuser ?
          <LoggedInNav />
          :
          <LoggedOutNav />
        }
      </div>
    </div>
   );
}
 
export default Nav;