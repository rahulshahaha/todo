import React, { useState, useContext } from 'react'
import OneOffs from './OneOffs/OneOffs'
import Config from './todoConfig/Config'
import TotalScore from './TotalScore'
import ProjectList from './ProjectList'
import { FbContext } from '../../store/contexts/fbContext'
import { DataContext } from '../../store/contexts/dataContext'
import CompletedToday from './CompletedToday'


const LeftBar = () => {

  const [showConfig, setShowConfig] = useState(false)
  const { FBuser } = useContext(FbContext)
  const { allLoaded } = useContext(DataContext)

  const click = (e) => {
    setShowConfig(!showConfig)
  }

  return ( 
    <div className="col-span-3 h-screen overflow-hidden" >
      <div className="h-full overflow-scroll hideBar pb-10">
        { FBuser && allLoaded ? (
          <div>
            <TotalScore />
            <CompletedToday />
            <OneOffs />
            <ProjectList />
            <p className="mt-10 cursor-pointer underline m-auto w-56" onClick={click}>{showConfig ? 'Hide Config' : 'Show Config'}</p>
            { showConfig ? (
              <div>
                <Config />
              </div>
            ) : null}
          </div>
        ): null}
      </div>
    </div>
   );
}
 
export default LeftBar;