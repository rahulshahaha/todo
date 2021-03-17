import moment from 'moment';


export const hydrateItem = (item, weights) =>{
  if(weights && item){
    const importance = weights.importanceTypes.filter(iType => {
      return iType.id === item.importance
    })[0]

    const actionType = weights.itemTypes.filter(aType => {
      return aType.id === item.actionType
    })[0]

    const daysTo = numberDaysTo(item.expectedUpdate)
    const score = Math.max(0,(1 * importance.weight * actionType.weight) - (daysTo * weights.dayDrop));

    const colorClass = itemColorClass(item)
  
    return {...item, importanceName: importance.name, importanceWeight: importance.weight, actionTypeName: actionType.name, actionTypeWeight: actionType.weight, daysTo, score, colorClass}
    
  }
  return item
}


const numberDaysTo = (timestamp) => {
  const now = moment(new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()));
  const expectedUpdate = moment.unix(timestamp.seconds)
  return expectedUpdate.diff(now,'days')
}

const itemColorClass = (item) => {
  const now = moment(new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()));
  const expectedUpdate = moment.unix(item.expectedUpdate.seconds)

  if(expectedUpdate.isBefore(now) && item.actionType !== 5 && item.actionType !== 6){
    return 'bg-red-600 text-white'
  }else if(expectedUpdate.isSame(now) && (item.actionType === 1 || item.actionType === 4)){
    return 'bg-purple-700 text-white'
  }else if(expectedUpdate.isSame(now) && (item.actionType === 2 || item.actionType === 3)){
    return 'bg-gray-600 text-white'
  }else if(item.actionType === 1 || item.actionType === 4){
    return 'bg-purple-300'
  }else if(item.actionType === 2 || item.actionType === 3){
    return 'bg-gray-400'
  }

  return 'bg-white'

}