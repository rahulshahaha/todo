
const moment = require('moment')




exports.cleanHistory = (history) => {  
  if(history && history.length > 0){
    return buildChartData(cleanDays(removeDuplicates(history)))
  }else{
    return null
  }
}

const cleanDays = (history) => {
  var newHistory = [];
  const uniqueDays = [...new Set(history.map(hist => moment.unix(hist.date.seconds).startOf('days').format('MM/DD/YY')))];

  uniqueDays.forEach(day => {
    var firstScore = 0;
    var firstTimestamp = null;
    var lastScore = 0;
    var lastTimestamp = null;
    history.forEach(hist => {
      if(day === moment.unix(hist.date.seconds).startOf('days').format('MM/DD/YY')){
        if(firstTimestamp === null){
          firstTimestamp = hist.date;
          firstScore = hist.score
        }else if(moment.unix(hist.date.seconds).isBefore(moment.unix(firstTimestamp))){
          firstTimestamp = hist.date;
          firstScore = hist.score
        }

        if(lastTimestamp === null){
          lastTimestamp = hist.date;
          lastScore = hist.score
        }else if(moment.unix(hist.date.seconds).isAfter(moment.unix(lastTimestamp))){
          lastTimestamp = hist.date;
          lastScore = hist.score
        }
      }
    })

    //log first/last
    newHistory.push({
      date: firstTimestamp,
      score: firstScore
    })
    if(firstTimestamp.seconds !== lastTimestamp.seconds){
      newHistory.push({
        date: lastTimestamp,
        score: lastScore
      })
    }

  })

  return newHistory.sort((a,b) => {
    return a.date.seconds - b.date.seconds
  })

}


const removeDuplicates = (history) => {
  var newHistory = []
  newHistory.push(history[0])
  for(var i = 1; i < history.length; i++){
    if(history[i].score !== history[i-1].score){
      newHistory.push(history[i])
    }
  }
  return newHistory
}

const buildChartData = (history) => {
  var lineData = []
  history.forEach(hist => {
    lineData.push({
      "x": moment.unix(hist.date.seconds).format('YYYY-MM-DD'),
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