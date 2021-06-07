import React, { useContext } from 'react'
import { ConfigContext } from '../store/contexts/configContext'
import PlanningView from './PlanningView'
import WorkingView from './WorkingView'
import { Switch, Route, Redirect } from 'react-router-dom'



const Main = () => {

  const { config } = useContext(ConfigContext)
  
  if(config && config.downForMaintenance === true){
    return(
      <p className="text-3xl">Down for maintenance</p>
    )
  }

  return ( 
    <div className="">
      <Switch>
        <Route exact path='/' component={WorkingView} />
        <Route exact path='/planning' component={PlanningView} />
        <Route exact path='/working' component={WorkingView} />
        <Route path='/'> <Redirect to="/" /> </Route>
      </Switch>
    </div>
   );
}
 
export default Main;