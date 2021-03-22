import moment from 'moment';


export const hydrateItem = (item, weights) =>{
  if(weights && item){
    const importance = weights.importanceTypes.filter(iType => {
      return iType.id === item.importance
    })[0]

    const actionType = weights.itemTypes.filter(aType => {
      return aType.id === item.actionType
    })[0]

    const daysTo = weekDaysBetween(item.expectedUpdate)
    // weekDaysBetween(item.expectedUpdate)
    const score = item.expectedUpdate ? Math.max(0,(1 * importance.weight * actionType.weight) - (daysTo * weights.dayDrop)) : 0;


    const colorClass = itemColorClass(item)
  
    return {...item, importanceName: importance.name, importanceWeight: importance.weight, actionTypeName: actionType.name, actionTypeWeight: actionType.weight, daysTo, score, colorClass}
    
  }
  return item
}


const weekDaysBetween = (timestamp) => {
  if(timestamp === null) return 0;
  const expectedUpdate = moment.unix(timestamp.seconds).startOf('days')
  const now = moment().startOf('days');
  var end = moment(expectedUpdate)
  var start = moment(now)
  var multiplier = 1
  const dailyInfo = [false, true, true, true, true, true, false]
  let totalDays = 0;

  if(expectedUpdate.isSame(now)){
    return 0;
  }
  if(expectedUpdate.isBefore(now)){
    start = moment(expectedUpdate)
    end = moment(now)
    multiplier = -1;
  }

  while(!start.isSame(end)){
    start.add(1,'d')
    if(dailyInfo[start.day()]){
      totalDays++;
    }
  }

  return totalDays * multiplier

}

const itemColorClass = (item) => {
  if(item.expectedUpdate === null) return 'bg-white'
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