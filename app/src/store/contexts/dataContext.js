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
    todaysScore: 0,
    tomorrowsScore: 0,
    thisWeeksScore: 0,
    allLoaded: false
  });


  return (
    <DataContext.Provider value={{ projects: data.projects, items: data.items, weights: data.weights, oneOffs: data.oneOffs, history: data.history, totalScore: data.totalScore, todaysScore: data.todaysScore, tomorrowsScore: data.tomorrowsScore, thisWeeksScore: data.thisWeeksScore, allLoaded: data.allLoaded, dataDispatch }}>{children}</DataContext.Provider>
  );
};

