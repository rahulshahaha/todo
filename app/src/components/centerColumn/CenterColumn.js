import React from 'react'
import LineChart from '../leftBar/LineChart';
import CardCollection from './CardCollection'
import UpcomingWork from './UpcomingWork'


const CenterColumn = () => {
  return ( 
    <div className='flex flex-col w-full col-span-6 col-start-4 p-2 h-screen overflow-hidden'>
      <UpcomingWork />
      <LineChart />
      <CardCollection />
    </div>
   );
}
 
export default CenterColumn;