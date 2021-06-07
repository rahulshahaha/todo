import React, { useContext } from 'react'
import { DataContext } from '../../store/contexts/dataContext';
import moment from 'moment'
import PlanningDayItem from './PlanningDayItem';
import { useDrop } from 'react-dnd'
import { dropped } from '../../store/actions'

const PlanningDay = ({day}) => {


  const [cp, drop] = useDrop(
    () => ({
      accept: 'ITEM',
      drop: (i,m) => {
        dropped(m.getItem(),day)
      },
      collect: (monitor) => {
        const item = monitor.getItem();
        if(!item || monitor.isOver() === false){
          return {
            hovered: false,
            item: null
          }
        }

        if(!moment.unix(item.expectedUpdate.seconds).startOf('days').isSame(day.date.startOf('days'))){
          const diff = moment.unix(item.expectedUpdate.seconds).startOf('days').diff(day.date.startOf('days'))
          item.newScore = (item.dayDrop * (diff/1000/60/60/24))
          
        }else{
          item.newScore = 0
        }
        
        return {
          hovered: monitor.isOver(),
          item
        }
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

  if(cp.item && cp.hovered === true){
    const addOnID = cp.item.id
    var same = false
    daysItems.forEach(item => {
      if(item.id === addOnID){
        same = true;
      }
    })
    if(!same){
      daysItems.push(cp.item)
      daysItems.sort((a,b) => {
        const bS = b.newScore ? Math.max(b.newScore + b.score,0) : b.score;
        const aS = a.newScore ? Math.max(a.newScore + a.score,0) : a.score;
        return bS - aS
      });
    }
  }

  var overdueItems = items ? items.filter(item => {
    if(day.date.isSame(getPreviousMonday()) && moment.unix(item.expectedUpdate.seconds).startOf('days').isBefore(day.date)){
      return true
    }
    return false
  }) : null

  var daysScore = 0;

  if(daysItems){
    daysItems.forEach(item => {
      if(item.newScore && item.newScore !== 0){
        daysScore += Math.max((item.score + item.newScore),0)
      }else{
        daysScore += item.score
      }
    })
  }


  const bgClass = day.today === 0 ? 'bg-doToday rounded-full p-1 text-white' : day.today === -1 ? 'bg-gray-400 rounded-full p-1' : 'bg-gray-200 rounded-full p-1'


  return ( 
    <div ref={drop} className={" flex flex-col overflow-hidden max-h-full border-l-2 border-r-2 border-black "}>
      <div className="border-b-4 border-black pb-1">
        <p className={"text-center font-bold "}><span className={" "}>{day.weekday}</span></p>
        <p className="text-center"><span className={bgClass} >{day.date.format("DD")}</span><span> - {daysScore.toFixed(2)}</span></p>
      </div>
      <div className="flex-shrink px-1 overflow-scroll">
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