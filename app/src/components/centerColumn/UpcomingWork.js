import React, { useContext } from 'react'
import { DataContext } from '../../store/contexts/dataContext';

const UpcomingWork = () => {

  const { todaysScore, tomorrowsScore, thisWeeksScore } = useContext(DataContext)


  return ( 
    <div className="grid grid-cols-3">
      <div>
        <p className="text-center text-2xl">{todaysScore.toFixed(2)}</p>
        <p className="text-center">Today</p>
      </div>
      <div>
        <p className="text-center text-2xl">{tomorrowsScore.toFixed(2)}</p>
        <p className="text-center">Tomorrow</p>
      </div>
      <div>
        <p className="text-center text-2xl">{thisWeeksScore.toFixed(2)}</p>
        <p className="text-center">Rest of Week</p>
      </div>
    </div>
   );
}
 
export default UpcomingWork;