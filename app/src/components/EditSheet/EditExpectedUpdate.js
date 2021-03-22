import React from 'react'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EditExpectedUpdate = ({value, change}) => {

  const expectedUpdate = value && value.seconds ? moment.unix(value.seconds).toDate() : value ? value : null

  return ( 
    <div>
      <p>Expected Update</p>
      <DatePicker id='expectedUpdate' className='formInput' selected={expectedUpdate} onChange={change} />
    </div>
   );
}
 
export default EditExpectedUpdate;