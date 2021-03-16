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
    <h1>{ totalScore.toFixed(2) }</h1>
   );
}
 
export default TotalScore;