import { useState, useEffect, useContext } from 'react';
import { FbContext } from '../store/contexts/fbContext';


export function useImportance(importanceID) {

  const { weights } = useContext(FbContext)
  const [importance, setImportance] = useState({name: null, id: null, weight: 0})

  useEffect(() => {

    const importance = weights ? weights.importanceTypes.filter(iType => {
      return iType.id === importanceID
    })[0] : {name: null, id: null, weight: 0}


    setImportance(importance)

  }, [weights, importanceID]);

  return importance;
}