import React, { useState } from 'react'
import AddItem from './AddItem'
import Login from './auth/Login'
import OneOffs from './OneOffs/OneOffs'
import Config from './todoConfig/Config'
import TotalScore from './TotalScore'


const LeftBar = () => {

  const [showConfig, setShowConfig] = useState(false)

  const click = (e) => {
    setShowConfig(!showConfig)
  }

  return ( 
    <div className="col-span-3 h-screen overflow-hidden" >
      <div className="h-full overflow-scroll hideBar pb-10">
        <Login />
        <AddItem />
        <TotalScore />
        <OneOffs />
        <p className="mt-10 cursor-pointer underline m-auto w-56" onClick={click}>{showConfig ? 'Hide Config' : 'Show Config'}</p>
        { showConfig ? (
          <div>
            <Config />
          </div>
        ) : null}
      </div>
    </div>
   );
}
 
export default LeftBar;