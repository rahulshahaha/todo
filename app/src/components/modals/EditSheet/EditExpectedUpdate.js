import React from 'react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EditExpectedUpdate = ({value, change, changed, changedClass}) => {

  const expectedUpdate = value && value.seconds ? moment.unix(value.seconds).toDate() : value ? value : null

  const dateChange = (newDate,g) => {
    var dateToSend = newDate
    if(dateToSend !== null){
      change(dateToSend)
    }
  }

  const focus = (e) => {
    e.target.select()
  }

  const filterDate = (d) => {
    if(d.getDay() === 0 || d.getDay() === 6){
      return false
    }
    return true
  }

  const bgClass = changed ? changedClass : ''

  return ( 
    <div className=" flex space-x-2">
      {/* <p className="font-bold text-md">Due:</p> */}
      <DatePicker id='expectedUpdate' filterDate={filterDate} isClearable={false} className={'cursor-pointer hover:underline ' + bgClass} selected={expectedUpdate} onFocus={focus} onChange={dateChange} />
    </div>
   );
}
 
export default EditExpectedUpdate;