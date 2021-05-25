import { useContext } from 'react';
import { DataContext } from './store/contexts/dataContext';
import { FilterContext } from './store/contexts/filterContext';

export default function useFilteredItems() {
  const { items } = useContext(DataContext)
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
    if(filterData.dayFilter !== 'all'){
      const filterNumber = parseInt(filterData.dayFilter);
      sortedItems = sortedItems.filter(item => {
        return item.daysTo <= filterNumber
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

  return sortedItems;
}