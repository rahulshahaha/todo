import React, { useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../config/fbConfig'

export const HistoryContext = React.createContext();


export const HistoryProvider = ({ children }) => {

  const [history, setHistory] = useState(null)

  const [user] = useAuthState(firebase.auth());

  
  useEffect(() => {
    if(user === null) return
    const req = new XMLHttpRequest();
      
    console.log("PULL HISTORY")
    req.onload = function() {
      setHistory(JSON.parse(req.response))
    }
    req.onerror = function() {
      console.log(req.response)
    }

    const params = {
      "id": user.uid,
      "days": 30
    }
      
    // const fullPath = "http://localhost:5001/todo-8303f/us-central1/history/all"
    const fullPath = "https://us-central1-todo-8303f.cloudfunctions.net/history/all"
    req.open("POST", fullPath, true);

    req.send(JSON.stringify(params));

  }, [user])

  return (
    <HistoryContext.Provider value={{ history, historyLoading:false }}>{children}</HistoryContext.Provider>
  );
};

