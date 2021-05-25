import React from 'react'
import useMetrics from '../../UseMetrics'

const CompletedToday = () => {

  const { completedScore } = useMetrics()

  const formattedCompletedScore = completedScore ? completedScore.toFixed(2) : 0

  return ( 
    <div className="w-full mb-5">
      <p className="m-auto w-48">Completed Today: {formattedCompletedScore}</p>
    </div>
   );
}
 
export default CompletedToday;