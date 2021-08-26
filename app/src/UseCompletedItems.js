import { useContext, useState, useEffect } from 'react';
import { CompletedItemsContext } from './store/contexts/completedItemsContext';
import  moment from 'moment'


export default function useHistory(projectID) {

  const [items, setItems] = useState([])
  const { completedItems } = useContext(CompletedItemsContext)


  useEffect(() => {
    const newItems = completedItems.filter(item => {
      return item.projectID === projectID
    }).map(item => {
      return {...item, score:item.scoreOnComplete, expectedUpdate: item.completedDate}
    }).sort((a,b) => {
      if(moment.unix(a.completedDate.seconds).isBefore(moment.unix(b.completedDate.seconds))){
        return 1
      }else if(moment.unix(b.completedDate.seconds).isBefore(moment.unix(a.completedDate.seconds))){
        return -1
      }
      return 0
    }).slice(0, 5)
    setItems(newItems)
  }, [completedItems,projectID])


  return items;
}