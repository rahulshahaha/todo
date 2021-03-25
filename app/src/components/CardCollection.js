import moment from 'moment';
import React, { useContext } from 'react'
import { FbContext } from '../store/fbContext';
import ItemCardContainer from './ItemCardContainer';


const CardCollection = () => {

  const { items, status } = useContext(FbContext)
  var sortedItems = items ? items.sort((a,b) => {
    if(a.expectedUpdate === null) return 1
    if(b.expectedUpdate === null) return -1
    return b.score - a.score
  }) : null;

  if(status && status.importanceFilters && sortedItems){
    const importanceFilters = status.importanceFilters
    sortedItems = sortedItems.filter(item => {
      if(importanceFilters[item.project.importance] === undefined) return true
      return importanceFilters[item.project.importance]
    })
  }

  if(status && sortedItems){
    if(status.dayFilter === 'today'){
      sortedItems = sortedItems.filter(item => {
        return moment.unix(item.expectedUpdate.seconds).startOf('day').isSameOrBefore(moment().startOf('day'))
      })
    }else if(status.dayFilter === 'nextThree'){
      sortedItems = sortedItems.filter(item => {
        return moment.unix(item.expectedUpdate.seconds).startOf('day').isSameOrBefore(moment().add(3,'days').startOf('day'))
      })
    }else if(status.dayFilter === 'overdue'){
      sortedItems = sortedItems.filter(item => {
        return moment.unix(item.expectedUpdate.seconds).startOf('day').isBefore(moment().startOf('day'))
      })
    }
  }

  if(status && status.actionFilters && sortedItems){
    const actionFilters = status.actionFilters
    sortedItems = sortedItems.filter(item => {
      if(actionFilters[item.actionType] === undefined) return true
      return actionFilters[item.actionType]
    })
  }


  return ( 
    <div className='flex flex-col w-full col-span-6 col-start-4 p-2 h-screen overflow-hidden'>
      <div className="overflow-scroll h-full hideBar">
        { sortedItems && sortedItems.map(item => {
          return <ItemCardContainer showProject={true} key={item.id} item={item} />
        })}
      </div>
    </div>
   );
}
 
export default CardCollection;