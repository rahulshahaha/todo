import React, { useReducer } from "react";
import { filterReducer } from '../reducers/filterReducer'


export const FilterContext = React.createContext();


export const FilterContextProvider = ({ children }) => {


  const [filterData, filterDispatch] = useReducer(filterReducer, {
    dayFilter: 'all'
  });


  return (
    <FilterContext.Provider value={{ filterData, filterDispatch }}>{children}</FilterContext.Provider>
  );
};

