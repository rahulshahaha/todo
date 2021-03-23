import React from 'react'
import AddItem from './AddItem'
import Login from './auth/Login'
import OneOffs from './OneOffs/OneOffs'
import Config from './todoConfig/Config'
import TotalScore from './TotalScore'


const LeftBar = () => {
  return ( 
    <div className="fixed w-1/4 col-span-3" >
      <Login />
      <AddItem />
      <TotalScore />
      <OneOffs />
      <Config />
    </div>
   );
}
 
export default LeftBar;