import React from 'react'
import LeftBar from './leftBar/LeftBar'
import CardCollection from './centerColumn/CardCollection'
import RightBar from './rightBar/RightBar'


const Main = () => {

  return ( 
    <div className="grid grid-cols-12">
      <LeftBar />
      <CardCollection />
      <RightBar />
    </div>
   );
}
 
export default Main;