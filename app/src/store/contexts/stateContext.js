import React, { useReducer } from "react";
import { stateReducer } from '../reducers/stateReducer'

export const StateContext = React.createContext();


export const StateProvider = ({ children }) => {

  const [stateStatus, stateDispatch] = useReducer(stateReducer, {
    workingView: true
  });




  return (
    <StateContext.Provider value={{ workingView: stateStatus.workingView, stateDispatch }}>{children}</StateContext.Provider>
  );
};

