const hydrateData = require("./hydrateData")
const moment = require("moment")



exports.newCleanHistory = (items, userDoc, projects) => {
  const hist = []
  cleanItems(items)
  const start = moment().subtract(30,'days').startOf('day')
  const today = moment().startOf('day')
  while(start.isSameOrBefore(today)){
    hist.push(hydrateData.hydrateData(items, userDoc, projects, start))
    start.add(1,'day')
  }
  return buildChartData(hist)
}

const buildChartData = (history) => {
  var lineData = []
  history.forEach(hist => {
    lineData.push({
      "x": moment(hist.date).format('YYYY-MM-DD'),
      "y": hist.score
    })
  })

  // return lineData

  return {
    "lines":[
      {
        "name": "Score History",
        "data": lineData,
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

const cleanItems = (items) => {
  return items.map(item => {
    if(item.completed === true){
      return cleanCompletedItem(item)
    }else{
      return cleanOpenItem(item)
    }
  })
}



const cleanCompletedItem = (item) => {
  return {
    expectedUpdate: item.completedDate,
    completed: item.completed,
    actionType: item.actionType,
    projectID: item.projectID
  }
}

const cleanOpenItem = (item) => {
  return {
    expectedUpdate: item.expectedUpdate,
    completed: item.completed,
    actionType: item.actionType,
    projectID: item.projectID
  }
}