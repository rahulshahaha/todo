import React, { useContext, useEffect, useState } from 'react'
import { FbContext } from '../../store/fbContext'


const DayFilter = () => {

  const { status, dispatch } = useContext(FbContext)
  const [value, setValue] = useState('all')

  useEffect(() => {
    if(status){
      setValue(status.dayFilter)
    }
  }, [status])

  const change = (e) => {
    dispatch({type: 'SET_DAY_FILTER', value: e.target.value})
  }

  return ( 
    <div className="mt-5">
      <p className="text-xl font-bold">Filter Date</p>
      <div>
        <div>
          <input onChange={change} type="radio" name="dateFilter" value="all" id="all" checked={value === 'all'}></input>
          <label>All</label>
        </div>
        <div>
          <input onChange={change} type="radio" name="dateFilter" value="today" checked={value === 'today'}></input>
          <label>Today</label>
        </div>
        <div>
          <input onChange={change} type="radio" name="dateFilter" value="nextThree" checked={value === 'nextThree'}></input>
          <label>Next 3 Days</label>
        </div>
        <div>
          <input onChange={change} type="radio" name="dateFilter" value="overdue" checked={value === 'overdue'}></input>
          <label>Overdue</label>
        </div>
      </div>
    </div>
   );
}
 
export default DayFilter;