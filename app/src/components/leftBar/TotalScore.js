import React, { useContext, useEffect } from 'react'
import { FbContext } from '../../store/contexts/fbContext';
import { logHistory } from '../../store/actions'
import { DataContext } from '../../store/contexts/dataContext';
import { ModalContext } from '../../store/contexts/modalContext';

const TotalScore = () => {

  const { FBuser } = useContext(FbContext)
  const { weights, totalScore, allLoaded } = useContext(DataContext)
  const { modalDispatch } = useContext(ModalContext)


  useEffect(() => {
 
     if(allLoaded && FBuser && weights && weights.currentUserScore && weights.currentUserScore.toFixed(2) !== totalScore.toFixed(2)){
       logHistory(totalScore)
     }
 
   }, [allLoaded, FBuser, totalScore, weights])


  const toggleChart = (e) => {
    modalDispatch({type:'TOGGLE_CHART'})
  }

  return ( 
    <div className="my-5">
      <div className="flex justify-center space-x-1">
        <h1 className="text-center text-4xl scoreLabel">{ totalScore.toFixed(2) }</h1>
        <svg onClick={toggleChart} className="w-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      </div>
    </div>
   );
}
 
export default TotalScore;