import React from 'react'
import LineChart from '../leftBar/LineChart';
import CardCollection from './CardCollection'


const CenterColumn = () => {
  return ( 
    <div className='flex flex-col w-full col-span-6 col-start-4 p-2 overflow-hidden'>
      <LineChart />
      <CardCollection />
    </div>
   );
}
 
export default CenterColumn;