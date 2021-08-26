import React from 'react'
import ApiCalendar from 'react-google-calendar-api';

const Temp = () => {


  const test = () => {
    ApiCalendar.handleAuthClick();
  }

  const out = () => {
    ApiCalendar.handleSignoutClick();
  }

  const events = () => {
    if (ApiCalendar.sign){
      ApiCalendar.listUpcomingEvents(10).then(({ result }) => {
        console.log(result.items);
      });
    }else{
      console.log('signed out')
    }
  }

  return ( 
    <div>
      <button onClick={test} className="btn">Authorize</button>
      <button onClick={events} className="btn">List</button>
      <button onClick={out} className="btn">Signout</button>
    </div>
   );
}
 
export default Temp;