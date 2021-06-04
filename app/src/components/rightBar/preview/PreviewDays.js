import React from 'react'
import moment from 'moment'
import PreviewDay from './PreviewDay'

const PreviewDays = () => {

  const daysToShow = 3
  const days = []


  for(var i = 0; i < daysToShow; i++){
    const thisDay = moment().startOf('day').add(i,'day')
    while(thisDay.day() === 6 || thisDay.day() === 0){
      thisDay.add(i,'day')
    }
    days.push({
      weekday: thisDay.format('dddd'),
      date: thisDay,
      today: i === 0 ? 0 : 1
    })
  }


  return ( 
    <div className="h-full">
      <div className="h-full">
        { days && days.map(day => {
          return <PreviewDay key={day.date.format('MM-DD-YYYY')} day={day} simple={true} />
        })}
      </div>
    </div>
  );
}
 
export default PreviewDays;