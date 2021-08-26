import { useContext, useState, useEffect } from 'react';
import { CompletedItemsContext } from './store/contexts/completedItemsContext';
import  moment from 'moment'
import { DataContext } from './store/contexts/dataContext';


export default function useHistory(projectID) {

  const [items, setItems] = useState([])
  const { completedItems } = useContext(CompletedItemsContext)
  const { weights } = useContext(DataContext)


  useEffect(() => {
    const newItems = completedItems.filter(item => {
      return item.projectID === projectID
    }).map(item => {
      const actionType = weights.actionTypeArray.filter(aType => {
        return aType.id === item.actionType
      })[0]
      return {...item, score:item.scoreOnComplete, expectedUpdate: item.completedDate, actionTypeName: actionType.name, colorClass: 'bg-neverDo'}
    }).sort((a,b) => {
      if(moment.unix(a.completedDate.seconds).isBefore(moment.unix(b.completedDate.seconds))){
        return 1
      }else if(moment.unix(b.completedDate.seconds).isBefore(moment.unix(a.completedDate.seconds))){
        return -1
      }
      return 0
    }).slice(0, 5)
    setItems(newItems)
  }, [completedItems,projectID, weights.actionTypeArray])


  return items;
}