import { useState, useEffect } from 'react';
import { useActionType } from './useActionType';
import { useImportance } from './useImportance';


export function useScore(item) {

  const [score, setScore] = useState(1.0)
  const importance = useImportance(item.importance)
  const actionType = useActionType(item.actionType)

  useEffect(() => {
    const newScore = 1 * importance.weight * actionType.weight
    setScore(newScore)

  }, [item, actionType, importance]);

  return score;
}