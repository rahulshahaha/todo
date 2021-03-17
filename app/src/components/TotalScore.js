import React, { useContext } from 'react'
import { FbContext } from '../store/fbContext';


const TotalScore = () => {

  const { items, oneOffs, weights } = useContext(FbContext)
  const oneOffWeight = weights ? weights.oneOff : 0;
  var totalScore = 0;
  if(items){
    for(var i = 0; i < items.length; i++){
      totalScore += items[i].score
    }
  }

  if(oneOffs){
    totalScore = totalScore + (oneOffs.length * oneOffWeight)
  }

  return ( 
    <div>
      <h1 className="text-center text-4xl my-5">{ totalScore.toFixed(2) }</h1>
    </div>
   );
}
 
export default TotalScore;