import React, { useContext, useState, useEffect } from 'react'
import { FilterContext } from '../../store/contexts/filterContext'
import useMetrics from '../../UseMetrics'
import moment from 'moment'
import { DataContext } from '../../store/contexts/dataContext'

const UpcomingWork = () => {

  const { todaysScore, tomorrowsScore, thisWeeksScore, filteredScore } = useMetrics()
  const { filterData, filterDispatch } = useContext(FilterContext)
  const [weekDays, setWeekDays] = useState("0")
  const { weights } = useContext(DataContext)
  const importances = weights ? weights.importanceTypes : {}
  const actionTypes = weights ? weights.actionTypes : {}

  useEffect(() => {
    var days = 0;
    const today = moment()
    while(today.day() !== 0){
      today.add(1,'day')
      if(today.day() !== 0 && today.day()  !== 6){
        days++
      }
    }
    setWeekDays(days.toString())

  }, [])


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

  const weekClick = (e) => {

    if(filterData.dayFilter === weekDays.toString()){
      filterDispatch({type: 'SET_DAY_FILTER', value: "all"})
    }else{
      filterDispatch({type: 'SET_DAY_FILTER', value: weekDays.toString()})
    }
  }

  const totalClick = (e) => {
    filterDispatch({type: 'ALL_IMPORTANCE', value: true, importances})
    filterDispatch({type: 'ALL_ACTION', value: true, actionTypes})
    filterDispatch({type: 'SET_DAY_FILTER', value: 'all'})
  }


  const todayColorClass = filterData.dayFilter === "0" ? 'text-yellow-300' : 'text-white'
  const tomorrowColorClass = filterData.dayFilter === "1" ? 'text-yellow-300' : 'text-white'
  const weekColorClass = filterData.dayFilter === weekDays ? 'text-yellow-300' : 'text-white'

  return ( 
    <div className="grid grid-cols-4 text-white">
      <div className={"cursor-pointer"} onClick={totalClick}>
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
      <div className={"cursor-pointer " + weekColorClass} onClick={weekClick}>
        <p className="text-center text-2xl">{thisWeeksScore.toFixed(2)}</p>
        <p className="text-center">Rest of Week</p>
      </div>
    </div>
   );
}
 
export default UpcomingWork;