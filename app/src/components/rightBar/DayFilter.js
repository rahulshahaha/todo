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

  const filterTypes = [
    {name:"dateFilter", value:"all", label:"All"},
    {name:"dateFilter", value:"today", label:"Today"},
    {name:"dateFilter", value:"nextThree", label:"Next 3 Days"},
    {name:"dateFilter", value:"overdue", label:"Overdue"}
  ]

  return ( 
    <div className="mt-5">
      <p className="text-xl font-bold">Filter Date</p>
      <div>
        { filterTypes.map(filt => {
          return (
            <div key={filt.value} className="flex space-x-1">
              <input className="self-center" onChange={change} type="radio" name={filt.name} value={filt.value} id={filt.value} checked={value === filt.value}></input>
              <label className="self-center">{filt.label}</label>
            </div>
          )
        })}
      </div>
    </div>
   );
}
 
export default DayFilter;