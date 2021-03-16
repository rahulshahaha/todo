import { useState, useEffect, useContext } from 'react';
import { FbContext } from '../store/contexts/fbContext';


export function useActionType(actionTypeID) {

  const { weights } = useContext(FbContext)
  const [actionType, setActionType] = useState({name: null, id: null, weight: 0})

  useEffect(() => {

    const actionType = weights ? weights.itemTypes.filter(iType => {
      return iType.id === actionTypeID
    })[0] : {name: null, id: null, weight: 0}


    setActionType(actionType)

  }, [weights, actionTypeID]);

  return actionType;
}