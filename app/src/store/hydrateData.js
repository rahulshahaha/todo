import moment from 'moment';


export const hydrateData = (items, weights, projects, oneOffs) => {
  const newWeights = weights ? hydrateWeights(weights) : null
  const newItems = items && newWeights && projects ? hydrateItems(items, newWeights, projects) : null
  const newProjects = newItems && projects ? hydrateProjects(newItems, projects) : null

  var totalScore = 0
  if(newItems){
    newItems.forEach(item => {
      totalScore += item.score
    })
  }

  if(oneOffs){
    oneOffs.forEach(oneOff => {
      totalScore += weights.oneOff
    })
  }

  const allDataPulled = items && weights && projects && oneOffs ? true : false

  return {items: newItems, weights: newWeights, projects: newProjects, totalScore, allDataPulled}
}


const hydrateProjects = (items, projects) => {
  const newProjects = projects.map(proj => {
    const itemsInProj = itemsInProject(items, proj)
    var projScore = 0;
    itemsInProj.forEach(item => projScore += item.score)
    return {...proj, totalScore: projScore, items: itemsInProj}
  })
  return newProjects
}

const itemsInProject = (items, project) => {
  if(project && items){
    return items.filter(item => {
      return item.projectID === project.id
    })
  }else{
    return null
  }
}

const hydrateWeights = (weights) => {
  weights.importanceArray = importanceArray(weights.importanceTypes)
  weights.actionTypeArray = actionTypeArray(weights.actionTypes)
  return weights
}


const importanceArray = (importanceTypes) => {
  const keys = Object.keys(importanceTypes)
  var importanceArray = []
  for (const key of keys) {
    importanceArray.push(importanceTypes[key])
  }
  importanceArray = importanceArray.sort((a,b) => {
    return a.id - b.id
  })
  
  return importanceArray
}

const actionTypeArray = (actionTypes) => {
  const keys = Object.keys(actionTypes)
  var actionTypeArray = []
  for(const key of keys){
    actionTypeArray.push(actionTypes[key])
  }
  actionTypeArray = actionTypeArray.sort((a,b) => {
    return a.id - b.id
  })
  return actionTypeArray
}



const hydrateItems = (items, weights, projects) => {
  if(!items || !weights || !projects) return null
  for(var i = 0; i < items.length; i++){
    items[i] = hydrateItem(items[i], weights, projects)
  }
  return items
}



const hydrateItem = (item, weights, projects) =>{


  if(weights && item && projects){
    const project = projects.filter(proj => {
      return proj.id === item.projectID
    })[0]

    const itemDeleted = project ? false : true;
    if(itemDeleted) return null

    const importance = weights.importanceArray.filter(iType => {
      return iType.id === project.importance
    })[0]

    const actionType = weights.actionTypeArray.filter(aType => {
      return aType.id === item.actionType
    })[0]

    const daysTo = weekDaysBetween(item.expectedUpdate)
    const score = item.expectedUpdate ? Math.max(0,(1 * importance.weight * actionType.weight) - (daysTo * weights.dayDrop)) : 0;


    const colorClass = itemColorClass(item)
  
    return {...item, deleted: itemDeleted, importanceName: importance.name, importanceWeight: importance.weight, actionTypeName: actionType.name, actionTypeWeight: actionType.weight, daysTo, score, colorClass, project}
    
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
  const now = moment().startOf('day');
  const expectedUpdate = moment.unix(item.expectedUpdate.seconds).startOf('day')

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

  return 'bg-gray-300'

}