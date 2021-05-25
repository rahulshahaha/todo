import React from 'react'
import useMetrics from '../../UseMetrics'

const UpcomingWork = () => {

  const { todaysScore, tomorrowsScore, thisWeeksScore, filteredScore } = useMetrics()


  return ( 
    <div className="grid grid-cols-4">
      <div>
        <p className="text-center text-2xl">{filteredScore.toFixed(2)}</p>
        <p className="text-center">Filtered View</p>
      </div>
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