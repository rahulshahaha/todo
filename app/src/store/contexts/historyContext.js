import React, { useState, useEffect } from "react";



export const HistoryContext = React.createContext();


export const HistoryProvider = ({ children }) => {

  const [history, setHistory] = useState(null)
  
  useEffect(() => {
    const req = new XMLHttpRequest();
      
    req.onload = function() {
      console.log("PULL")
      setHistory(JSON.parse(req.response))
    }
    req.onerror = function() {
      console.log(req.response)
    }
      
    const fullPath = "https://us-central1-todo-8303f.cloudfunctions.net/history/all"
    req.open("GET", fullPath, true);

    // req.send(JSON.stringify(params));
    req.send();

  }, [])

  return (
    <HistoryContext.Provider value={{ history, historyLoading:false }}>{children}</HistoryContext.Provider>
  );
};

