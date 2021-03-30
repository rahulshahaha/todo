import React from 'react'
import LeftBar from './leftBar/LeftBar'
import RightBar from './rightBar/RightBar'
import CenterColumn from './centerColumn/CenterColumn'


const Main = () => {

  return ( 
    <div className="grid grid-cols-12">
      <LeftBar />
      <CenterColumn />
      <RightBar />
    </div>
   );
}
 
export default Main;