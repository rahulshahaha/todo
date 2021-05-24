import React, { useContext } from 'react'
import LeftBar from './leftBar/LeftBar'
import RightBar from './rightBar/RightBar'
import CenterColumn from './centerColumn/CenterColumn'
import { ConfigContext } from '../store/contexts/configContext'


const Main = () => {

  const { config } = useContext(ConfigContext)
  
  if(config && config.downForMaintenance === true){
    return(
      <p className="text-3xl">Down for maintenance</p>
    )
  }

  return ( 
    <div className="grid grid-cols-12">
      <LeftBar />
      <CenterColumn />
      <RightBar />
    </div>
   );
}
 
export default Main;