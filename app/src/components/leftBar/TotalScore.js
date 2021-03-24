import React, { useContext, useEffect, useState } from 'react'
import { FbContext } from '../../store/fbContext';
import { logHistory } from '../../store/actions'
import LineChart from './LineChart'

const TotalScore = () => {

  const { items, oneOffs, weights, FBuser } = useContext(FbContext)
  const oneOffWeight = weights ? weights.oneOff : 0;
  const [totalScore, setTotalScore] = useState(0)
  const [showChart, setShowChart] = useState(false)

  const chartClass = showChart ? 'block' : 'hidden'

  useEffect(() => {
   var newScore = 0
   var hydrated = false;
    if(items && oneOffs){
      for(var i = 0; i < items.length; i++){
        newScore += items[i].score
      }
      if(newScore > 0) hydrated = true;
      newScore = newScore + (oneOffs.length * oneOffWeight)
    }


    if(newScore !== totalScore && items && oneOffs && hydrated && FBuser){
      logHistory(newScore)
    }

    setTotalScore(newScore)
  }, [items, oneOffs, oneOffWeight, totalScore, FBuser])

  const toggleChart = (e) => {
    setShowChart(!showChart)
  }

  return ( 
    <div className="my-5">
      <div className="flex justify-center space-x-1">
        <h1 className="text-center text-4xl scoreLabel">{ totalScore.toFixed(2) }</h1>
        <svg onClick={toggleChart} className="w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      </div>
      <LineChart chartClass={chartClass} />
    </div>
   );
}
 
export default TotalScore;