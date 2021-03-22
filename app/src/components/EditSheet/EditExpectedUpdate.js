import React from 'react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EditExpectedUpdate = ({value, change}) => {

  const expectedUpdate = value && value.seconds ? moment.unix(value.seconds).toDate() : value ? value : null

  const dateChange = (newDate,g) => {
    var dateToSend = newDate
    if(dateToSend !== null){
      change(dateToSend)
    }
  }

  return ( 
    <div>
      <p>Expected Update</p>
      <DatePicker id='expectedUpdate' isClearable={false} className='formInput' selected={expectedUpdate} onChange={dateChange} />
    </div>
   );
}
 
export default EditExpectedUpdate;