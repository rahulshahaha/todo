import React, { useContext } from 'react'
import { DataContext } from '../../store/contexts/dataContext';
import moment from 'moment'
import PlanningDayItem from './PlanningDayItem';
import { useDrop } from 'react-dnd'
import { dropped } from '../../store/actions'

const PlanningDay = ({day}) => {


  const [, drop] = useDrop(
    () => ({
      accept: 'ITEM',
      drop: (i,m) => {
        dropped(m.getItem(),day)
      }
    }),
    [day]
  )

  const { items } = useContext(DataContext)

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


  const daysItems = items ? items.filter(item => {
    return moment.unix(item.expectedUpdate.seconds).startOf('days').isSame(day.date.startOf('day'))
  }).sort((a,b) => {
    return b.score - a.score
  }) : null

  var overdueItems = items ? items.filter(item => {
    if(day.date.isSame(getPreviousMonday()) && moment.unix(item.expectedUpdate.seconds).startOf('days').isBefore(day.date)){
      return true
    }
    return false
  }) : null

  var daysScore = 0;

  if(daysItems){
    daysItems.forEach(item => {
      daysScore += item.score
    })
  }


  const bgClass = day.today === 0 ? 'bg-green-200' : day.today === -1 ? 'bg-gray-400' : ''

  return ( 
    <div ref={drop} className={" h-full border-r-2 border-black " + bgClass}>
      <div className="border-b-4 border-black">
        <p className={"text-center font-bold "}>{day.weekday}</p>
        <p className="text-center">{day.date.format("MM/DD/YYYY")}</p>
        <p className="text-center">{daysScore.toFixed(2)}</p>
      </div>
      <div className="px-1 h-full">
      { overdueItems && overdueItems.length > 0 ? 
          <p className="font-bold">Past Weeks:</p>
          :
          null
        }
        {overdueItems && overdueItems.length > 0 && overdueItems.map(overdueItem => {
          return(
            <PlanningDayItem daysItem={overdueItem} key={overdueItem.id} />
          )
        })
        }
        { overdueItems && overdueItems.length > 0 ? 
          <hr className="border-4 border-black"></hr>
          :
          null
        }
        { daysItems && daysItems.map(daysItem => {
          return(
            <PlanningDayItem daysItem={daysItem} key={daysItem.id} />
          )
        })}
      </div>
    </div>
   );
}
 
export default PlanningDay;