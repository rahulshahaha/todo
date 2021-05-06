import React, { useReducer } from "react";
import { filterReducer } from '../reducers/filterReducer'


export const FilterContext = React.createContext();


export const FilterContextProvider = ({ children }) => {


  const [filterData, filterDispatch] = useReducer(filterReducer, {
    dayFilter: 'all',
    dayFilters: [
      {name:'All', value:'all', id:'all', filtName: 'dateFilter'},
      {name:'Today', value:'0', id:'today', filtName: 'dateFilter'},
      {name:'Next Day', value:'1', id:'nextDay', filtName: 'dateFilter'},
      {name:'Next 2 Days', value:'2', id:'nextTwoDays', filtName: 'dateFilter'},
      {name:'Overdue', value:'-1', id:'overdue', filtName: 'dateFilter'},
    ]
  });


  return (
    <FilterContext.Provider value={{ filterData, filterDispatch }}>{children}</FilterContext.Provider>
  );
};

