import React from 'react'
import CenterColumn from './centerColumn/CenterColumn';
import LeftBar from './leftBar/LeftBar';
import RightBar from './rightBar/RightBar';


const WorkingView = () => {
  return ( 
    <div className="max-h-screen grid grid-cols-12 h-screen pb-10">
      <LeftBar />
      <CenterColumn />
      <RightBar />
    </div>
   );
}
 
export default WorkingView;