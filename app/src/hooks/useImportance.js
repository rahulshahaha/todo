import { useState, useEffect, useContext } from 'react';
import { FbContext } from '../store/contexts/fbContext';


export function useImportance(importanceID) {

  const { weights } = useContext(FbContext)
  const [importanceName, setImportanceName] = useState(null)

  useEffect(() => {

    const importance = weights ? weights.importanceTypes.filter(iType => {
      return iType.id === importanceID
    }) : null

    const newImportanceName = importance ? importance[0].name : null

    setImportanceName(newImportanceName)

  }, [weights, importanceID]);

  return importanceName;
}