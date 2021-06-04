import React from 'react'
import PlanningDay from './PlanningDay'
import moment from 'moment'

const PlanningWeek = ({week}) => {

  const getPreviousMonday = () => {
    const currentCheck = moment().startOf('day')
    var previousMonday = null;
    while (previousMonday === null){
      if(currentCheck.day() === 1){
        previousMonday = currentCheck
      }else{
        currentCheck.subtract(1,'d')
      }
    }
    return previousMonday;
  }

  const days = []
  for(var i = 0; i<7; i++){
    const day = getPreviousMonday().startOf('day').add(i,'d').add(week,'w');
    const todaysDate = moment().startOf('day')
    const today = todaysDate.isSame(day) ? 0 : todaysDate.isBefore(day) ? 1 : todaysDate.isAfter(day) ? -1 : 0;
    if(day.day() !== 0 && day.day() !== 6){
      days.push({
        weekday: day.format('dddd'),
        date: day,
        today
      })
    }
  }


  return ( 
    <div className="max-h-1/2 h-1/2 grid grid-cols-5 w-full border-b-8 border-black">
      { days && days.map(day => {
        return(
          <PlanningDay key={day.weekday} day={day} />
        )
      })}
    </div>
   );
}
 
export default PlanningWeek;