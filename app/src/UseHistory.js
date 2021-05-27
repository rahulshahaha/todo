import { useEffect, useState } from 'react';


export default function useHistory() {

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

  return history;
}