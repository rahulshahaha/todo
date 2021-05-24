import moment from 'moment'

var gblRawItems = null
var gblItems = null
var gblWeights = null

export const returnHistory = (rawItems, items, weights) => {
  var newItems = null;
  if(items === null || items === undefined) return
  gblRawItems = rawItems;
  gblItems = items
  gblWeights = weights
  newItems = cleanItems()
  var history = buildHistory(newItems)
  return buildChartData(history)
}

const buildChartData = (history) => {
  // var lineData = []
  // history.forEach(hist => {
  //   lineData.push({
  //     "x": moment.unix(hist.date.seconds).toDate(),
  //     "y": hist.score
  //   })
  // })

  return {
    "lines":[
      {
        "name": "Score History",
        "data": history,
        "color": "black"
      }
    ],
    "minY":0,
    "xTicks":6,
    "yTicks":7,
    "dots":true,
    "dotSize":2
  }
}


const buildHistory = (items) => {
  const firstDate = earliestCreation()
  const today = moment(new Date()).startOf('days').toDate()
  const itemHistory = []
  const history = []
  const itemsLength = items.length
  const dayDrop = gblWeights.dayDrop

  for(var i = moment(firstDate).startOf('days').toDate(); i <= moment(today).toDate(); i.setDate(i.getDate() + 1)){
    var dateScore = 0;
    for(var j = 0; j < itemsLength; j++){
      const score = items[j].completed === true ? completedItemScore(items[j],i) : openItemScore(items[j],i)

      dateScore += score;
      itemHistory.push({
        date: i,
        item: items[j],
        score
      })
    }
    history.push({
      x: moment(i).toDate(),
      y: dateScore
    })
  }
  return history
}


const completedItemScore = (item,day) => {
  const daysTo = weekDaysBetween(item.completedDate, day)
  return item.completedDate > day ? Math.max(0,(1 * item.importanceTypeWeight * item.actionTypeWeight) - (daysTo * gblWeights.dayDrop)) : 0;
}

const openItemScore = (item, day) => {
  // const daysTo = moment.unix(item.expectedUpdate.seconds).isBefore(moment()) ? weekDaysBetween(moment().startOf('days'), day) : weekDaysBetween(moment.unix(item.expectedUpdate.seconds).startOf('days'), day)

  const daysTo = weekDaysBetween(moment.unix(item.expectedUpdate.seconds).startOf('days'), day)

  return moment.unix(item.created.seconds).startOf('days').isSameOrBefore(moment(day)) ? Math.max(0,(1 * item.importanceWeight * item.actionTypeWeight) - (daysTo * gblWeights.dayDrop)) : 0
}

const weekDaysBetween = (expectedUpdate, now) => {
  expectedUpdate = moment(expectedUpdate)
  now = moment(now)
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



const cleanItems = () => {
  return gblRawItems.map(item => {
    if(item.completed === true){
      return cleanCompletedItem(item)
    }else{
      return cleanOpenItem(item)
    }
  })
}

const cleanCompletedItem = (item) => {
    return {
      completedDate: moment.unix(item.completedDate.seconds).startOf('days').toDate(),
      created: moment.unix(item.created.seconds).startOf('days').toDate(),
      scoreOnComplete: item.scoreOnComplete,
      expectedUpdate: moment.unix(item.expectedUpdate.seconds).startOf('days').toDate(),
      importanceTypeWeight: item.importanceWeightEnd,
      actionTypeWeight: item.actionTypeWeightEnd,
      completed: item.completed
    }
}


const cleanOpenItem = (item) => {
  return gblItems.filter(gblItem => {
    return gblItem.id === item.id
  })[0]
}

const earliestCreation = () => {
  var earliestCreated = moment().startOf('days')

  gblRawItems.forEach(item => {
    if(moment.unix(item.created.seconds).startOf('days').isBefore(earliestCreated)){
      earliestCreated = moment.unix(item.created.seconds).startOf('days')
    }
  })
  return earliestCreated
}