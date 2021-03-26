import moment from 'moment';
import React, { useContext } from 'react'
import { FbContext } from '../../store/contexts/fbContext';
import { FilterContext } from '../../store/contexts/filterContext';
import ItemCardContainer from '../itemCards/ItemCardContainer';


const CardCollection = () => {

  const { items } = useContext(FbContext)
  const { filterData } = useContext(FilterContext)

  var sortedItems = items ? items.sort((a,b) => {
    if(a.expectedUpdate === null) return 1
    if(b.expectedUpdate === null) return -1
    return b.score - a.score
  }) : null;

  if(filterData && filterData.importanceFilters && sortedItems){
    const importanceFilters = filterData.importanceFilters
    sortedItems = sortedItems.filter(item => {
      if(importanceFilters[item.project.importance] === undefined) return true
      return importanceFilters[item.project.importance]
    })
  }

  if(filterData && sortedItems){
    if(filterData.dayFilter === 'today'){
      sortedItems = sortedItems.filter(item => {
        return moment.unix(item.expectedUpdate.seconds).startOf('day').isSameOrBefore(moment().startOf('day'))
      })
    }else if(filterData.dayFilter === 'nextThree'){
      sortedItems = sortedItems.filter(item => {
        return moment.unix(item.expectedUpdate.seconds).startOf('day').isSameOrBefore(moment().add(3,'days').startOf('day'))
      })
    }else if(filterData.dayFilter === 'overdue'){
      sortedItems = sortedItems.filter(item => {
        return moment.unix(item.expectedUpdate.seconds).startOf('day').isBefore(moment().startOf('day'))
      })
    }
  }

  if(filterData && filterData.actionFilters && sortedItems){
    const actionFilters = filterData.actionFilters
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