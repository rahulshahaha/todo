import React, { useReducer } from "react";
import { dataReducer } from '../reducers/dataReducer'


export const DataContext = React.createContext();


export const DataContextProvider = ({ children }) => {


  const [data, dataDispatch] = useReducer(dataReducer, {
    projects: null,
    items: null,
    weights: null,
    oneOffs: null,
    history: null,
    totalScore: 0,
    allLoaded: false
  });


  return (
    <DataContext.Provider value={{ projects: data.projects, items: data.items, weights: data.weights, oneOffs: data.oneOffs, history: data.history, totalScore: data.totalScore, allLoaded: data.allLoaded, dataDispatch }}>{children}</DataContext.Provider>
  );
};

