import React, { useContext } from 'react'
import { FilterContext } from '../../store/contexts/filterContext'
import useMetrics from '../../UseMetrics'

const UpcomingWork = () => {

  const { todaysScore, tomorrowsScore, thisWeeksScore, filteredScore } = useMetrics()
  const { filterData, filterDispatch } = useContext(FilterContext)

  const todayClick = (e) => {
    if(filterData.dayFilter === "0"){
      filterDispatch({type: 'SET_DAY_FILTER', value: "all"})
    }else{
      filterDispatch({type: 'SET_DAY_FILTER', value: "0"})
    }
  }

  const tomorrowClick = (e) => {
    if(filterData.dayFilter === "1"){
      filterDispatch({type: 'SET_DAY_FILTER', value: "all"})
    }else{
      filterDispatch({type: 'SET_DAY_FILTER', value: "1"})
    }
  }


  const todayColorClass = filterData.dayFilter === "0" ? 'text-yellow-300' : 'text-white'
  const tomorrowColorClass = filterData.dayFilter === "1" ? 'text-yellow-300' : 'text-white'

  return ( 
    <div className="grid grid-cols-4 text-white">
      <div>
        <p className="text-center text-2xl">{filteredScore.toFixed(2)}</p>
        <p className="text-center">Filtered View</p>
      </div>
      <div className={"cursor-pointer " + todayColorClass} onClick={todayClick}>
        <p className="text-center text-2xl">{todaysScore.toFixed(2)}</p>
        <p className="text-center">Today</p>
      </div>
      <div className={"cursor-pointer " + tomorrowColorClass} onClick={tomorrowClick}>
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