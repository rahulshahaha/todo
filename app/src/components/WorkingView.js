import React from 'react'
import CenterColumn from './centerColumn/CenterColumn';
import LeftBar from './leftBar/LeftBar';
import RightBar from './rightBar/RightBar';


const WorkingView = () => {
  return ( 
    <div className="grid grid-cols-12">
      <LeftBar />
      <CenterColumn />
      <RightBar />
    </div>
   );
}
 
export default WorkingView;