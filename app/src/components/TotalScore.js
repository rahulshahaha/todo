import React, { useContext } from 'react'
import { FbContext } from '../store/fbContext';


const TotalScore = () => {

  const { items, oneOffs } = useContext(FbContext)
  var totalScore = 0;
  if(items){
    for(var i = 0; i < items.length; i++){
      totalScore += items[i].score
    }
  }

  if(oneOffs){
    totalScore = totalScore + (oneOffs.length * 0.5)
  }

  return ( 
    <div>
      <h1 className="text-center text-4xl my-5">{ totalScore.toFixed(2) }</h1>
    </div>
   );
}
 
export default TotalScore;