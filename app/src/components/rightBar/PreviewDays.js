import React, { useContext } from 'react'
import moment from 'moment'
import PlanningDay from '../planningView/PlanningDay'
import { StateContext } from '../../store/contexts/stateContext'

const PreviewDays = () => {

  const daysToShow = 3
  const days = []
  const { showPreview, stateDispatch } = useContext(StateContext)


  for(var i = 0; i < daysToShow; i++){
    const thisDay = moment().startOf('day').add(i,'day')
    days.push({
      weekday: thisDay.format('dddd'),
      date: thisDay,
      today: i === 0 ? 0 : 1
    })
  }

  const togglePreview = (e) => {
    // setShowPreview(!showPreview)
    stateDispatch({type:'TOGGLE_PREVIEW'})
  }



  return ( 
    <div>
      <p className="cursor-pointer underline" onClick={togglePreview}>{showPreview ? "Hide Preview" : "Show Preview"}</p>
      { showPreview ? 
        <div>
          { days && days.map(day => {
            return <PlanningDay key={day.date.format('MM-DD-YYYY')} day={day} />
          })}
        </div>
        : null
      }
    </div>
  );
}
 
export default PreviewDays;