import React from 'react'
import { updateExpectedUpdate } from '../../store/actions'
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ItemExpectedUpdate = ({ item }) => {
  const expectedUpdate = moment.unix(item.expectedUpdate.seconds)
  
  const dateChange = (newDate) => {
    updateExpectedUpdate(newDate, item.id)
  }



  return ( 
    <td><DatePicker wrapperClassName='mr-10' className={item.colorClass + ' static'} selected={expectedUpdate.toDate()} onChange={dateChange} /></td>
   );
}
 
export default ItemExpectedUpdate;