import React, { useContext } from 'react'
import { ConfigContext } from '../store/contexts/configContext'
import { StateContext } from '../store/contexts/stateContext'
import PlanningView from './PlanningView'
import WorkingView from './WorkingView'


const Main = () => {

  const { config } = useContext(ConfigContext)
  const { workingView } = useContext(StateContext)
  
  if(config && config.downForMaintenance === true){
    return(
      <p className="text-3xl">Down for maintenance</p>
    )
  }

  return ( 
    <div className="">
      { workingView ? 
        <WorkingView />
        :
        <PlanningView />
      }
    </div>
   );
}
 
export default Main;