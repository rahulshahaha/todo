import React, { useReducer } from "react";
import { stateReducer } from '../reducers/stateReducer'

export const StateContext = React.createContext();


export const StateProvider = ({ children }) => {

  const [stateStatus, stateDispatch] = useReducer(stateReducer, {
    workingView: true,
    showFilters: true
  });




  return (
    <StateContext.Provider value={{ ...stateStatus, stateDispatch }}>{children}</StateContext.Provider>
  );
};

