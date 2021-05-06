import React, { useContext, useEffect, useState } from 'react'
import { FilterContext } from '../../store/contexts/filterContext'


const DayFilter = () => {

  const { filterData, filterDispatch } = useContext(FilterContext)
  const [value, setValue] = useState('1000000')

  useEffect(() => {
    if(filterData){
      setValue(filterData.dayFilter)
    }
  }, [filterData])

  const change = (e) => {
    filterDispatch({type: 'SET_DAY_FILTER', value: e.target.value})
  }

  const filterTypes = filterData.dayFilters

  return ( 
    <div className="mt-5">
      <p className="text-xl font-bold">Filter Date</p>
      <div>
        { filterTypes.map(filt => {
          return (
            <div key={filt.id} className="flex space-x-1">
              <input className="self-center" onChange={change} type="radio" name={filt.filtName} value={filt.value} checked={value === filt.value}></input>
              <label className="self-center">{filt.name}</label>
            </div>
          )
        })}
      </div>
    </div>
   );
}
 
export default DayFilter;