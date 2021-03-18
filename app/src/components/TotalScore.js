import React, { useContext, useEffect, useState } from 'react'
import { FbContext } from '../store/fbContext';
import { logHistory } from '../store/actions'

const TotalScore = () => {

  const { items, oneOffs, weights } = useContext(FbContext)
  const oneOffWeight = weights ? weights.oneOff : 0;
  const [totalScore, setTotalScore] = useState(0)

  useEffect(() => {
   var newScore = 0
    if(items){
      for(var i = 0; i < items.length; i++){
        newScore += items[i].score
      }
    }
  
    if(oneOffs){
      newScore = newScore + (oneOffs.length * oneOffWeight)
    }

    if(newScore !== totalScore && items && oneOffs){
      logHistory(newScore)
    }

    setTotalScore(newScore)
  }, [items, oneOffs, oneOffWeight, totalScore])


  return ( 
    <div>
      <h1 className="text-center text-4xl my-5">{ totalScore.toFixed(2) }</h1>
    </div>
   );
}
 
export default TotalScore;