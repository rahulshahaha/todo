import moment from 'moment'
import * as d3module from 'd3'
import d3tip from 'd3-tip'

const d3 = {
  ...d3module,
  tip: d3tip
}


export const cleanHistory = (history) => {  
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
      "x": moment.unix(hist.date.seconds).toDate(),
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


export const dateFormatter = (d) => {
  return moment(d).format('MM/DD/YY')
}

export const decimalFormatter = (d) => {
  return d.toFixed(2)
}

export const timeOnlyFormatter = (d) => {
  return moment(d).format('h:mm a')
}


const xMinMax = (chartData) => {
  var minX = new Date();
  var maxX = 0
  chartData.lines.forEach(line => {
    line.data.forEach(point => {
        maxX = Math.max(point.x,maxX)
        minX = Math.min(point.x,minX)
    })
  });
  return {
    "max": maxX,
    "min": minX
  }
}

const yMinMax = (chartData) => {
  var maxY = 0
  var minY = null
  chartData.lines.forEach(line => {
    line.data.forEach(point => {
        maxY = Math.max(point.y,maxY)
        minY = minY ? Math.min(point.y,minY) : point.y
    })
  });
  minY = minY - ((maxY - minY) * 0.1)

  return {
    "max": maxY,
    "min": minY
  }
}


export const yScaleLinear = (chartData, height) => {
  const yRange = yMinMax(chartData)

  return d3.scaleLinear()
    .range([0,height])
    .domain([yRange.max,yRange.min])
}

export const xScaleTime = (chartData, width) => {
  const xRange = xMinMax(chartData)

  return d3.scaleTime()
    .range([0,width])
    .domain([xRange.min,xRange.max])
}


export const getToolTip = () => {
  return d3.tip()
    .attr('class', 'tip card')
    .html((e,d) => {
        const xLabel = dateFormatter(d.x)
        const yLabel = decimalFormatter(d.y)
        const xTimeLabel = timeOnlyFormatter(d.x)
        let content = ''
        content += `<div class="score">${yLabel}</div>`;
        content += `<div class="name">${xLabel}</div>`;
        content += `<div class="cost">${xTimeLabel}</div>`;
        return content;
    })
    .direction('s')
    .offset([15, 0]);
}