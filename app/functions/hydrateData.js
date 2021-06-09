const moment = require('moment')

const Firestore = require("@google-cloud/firestore");
const firestore = new Firestore({
  projectId: "todo-8303f",
  timestampsInSnapshots: true,
});

// var currentItems, currentWeights, currentProjects


exports.hydrateData = (items, weights, projects, start) => {

  const newWeights = weights ? hydrateWeights(weights) : null
  const newItems = items && newWeights && projects ? hydrateItems(items, newWeights, projects, start) : null

  var totalScore = 0
  if(newItems){
    newItems.forEach(item => {
      if(item.completedDate){
        if(moment.unix(item.completedDate.seconds).startOf('days').isAfter(start)){
          totalScore += item.score
        }
      }else{
        totalScore += item.score
      }
    })
  }

  return {date: moment(start), score:totalScore}
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



const hydrateItems = (items, weights, projects, start) => {
  if(!items || !weights || !projects) return null
  for(var i = 0; i < items.length; i++){
    items[i] = hydrateItem(items[i], weights, projects, start)
  }
  return items
}



const hydrateItem = (item, weights, projects, start) =>{


  if(weights && item && projects){
    const project = projects.filter(proj => {
      return proj.id === item.projectID
    })[0]

    const itemDeleted = project ? false : true;
    if(itemDeleted){
      // return null
    } 

    const importance = weights.importanceArray.filter(iType => {
      return iType.id === project.importance
    })[0]

    const actionType = weights.actionTypeArray.filter(aType => {
      return aType.id === item.actionType
    })[0]

    const daysTo = weekDaysBetween(item.expectedUpdate, start)
    const score = item.expectedUpdate ? Math.max(0,(1 * importance.weight * actionType.weight) - (daysTo * weights.dayDrop)) : 0;
  
    return {...item, deleted: itemDeleted, importanceName: importance.name, importanceWeight: importance.weight, actionTypeName: actionType.name, actionTypeWeight: actionType.weight, daysTo, score, project}
    
  }
  return item
}


const weekDaysBetween = (timestamp, startDay) => {
  if(timestamp === null) return 0;
  const expectedUpdate = moment.unix(timestamp.seconds).startOf('days')
  const now = startDay;
  var end = moment(expectedUpdate).startOf('days')
  var start = moment(now).startOf('days')
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