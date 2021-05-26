import React from 'react'
import useMetrics from '../../UseMetrics'

const CompletedToday = () => {

  const { completedScore, createdScore } = useMetrics()

  const formattedCompletedScore = completedScore ? completedScore.toFixed(2) : 0
  const formattedCreatedScore = createdScore ? createdScore.toFixed(2) : 0

  return ( 
    <div className="w-full mb-5">
      <p className="m-auto w-48">Completed Today: {formattedCompletedScore}</p>
      <p className="m-auto w-48">Created Today: {formattedCreatedScore}</p>
    </div>
   );
}
 
export default CompletedToday;