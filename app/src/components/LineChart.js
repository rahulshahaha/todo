import React, { useRef, useEffect, useContext } from 'react';
import * as d3module from 'd3'
import d3tip from 'd3-tip'
import moment from 'moment'
import { FbContext } from '../store/fbContext';

const d3 = {
  ...d3module,
  tip: d3tip
}


const LineChart = () => {

    const {history, user} = useContext(FbContext)
    var chartData = null

    if(history && history.length > 0){
      var lineData = []
      history.forEach(hist => {
        lineData.push({
          "x": moment.unix(hist.date.seconds).toDate(),
          "y": hist.score
        })
      })
      chartData = {
        "lines":[
          {
            "name": "Score History",
            "data": lineData
          }
        ],
        "minY":0,
        "xTicks":6,
        "yTicks":10,
        "dots":false,
        "dotSize":1.75
      }
    }

    var xFormat = (d) => d
    var yFormat = (d) => d

    if(chartData !== null){
        xFormat = (d) => {
            return moment(d).format('MM/DD/YY')
        }
        yFormat = (d) => {
            return d.toFixed(2)
        }
    }


    const ref = useRef()


    useEffect(() => {

    //graph size
    const graphHeight = 200
    const graphWidth = 500
    const margin = { top: 10, bottom: 20, left: 35, right: 20 };

    const svg = d3.select(ref.current)
        .attr("viewBox", `0 0 ${graphWidth} ${graphHeight}`)
        
    //select group for graph
    const chartArea = svg.select('.chartArea')
        .attr('height', graphHeight)
        .attr('class','chartArea')
        .attr('width', graphWidth)
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    chartArea.selectAll('g').remove();

    const width = graphWidth - margin.left - margin.right;
    const height = graphHeight - margin.top - margin.bottom;

    const graph = chartArea
    .append("g")
    .attr("transform", `translate(-${margin.left},-${margin.top})`);

    //remove all current groups within graph
    graph.selectAll('g').remove();
    // graph.selectAll('circle').remove();
    graph.selectAll('path').remove();

    if(chartData){

    //create dotted line group and append to graph
    const hoverLineGroup = graph.append('g')
        .style('opacity',0)
        .attr("transform", `translate(${margin.left},${margin.top})`)

    //create x line and append
    const xHoverLine = hoverLineGroup.append('line')
    .attr('stroke','#aaa')
    .attr('stroke-width', 1)
    .attr('stroke-dasharray',4)

    //create y line and append
    const yHoverLine = hoverLineGroup.append('line')
    .attr('stroke','#aaa')
    .attr('stroke-width', 1)
    .attr('stroke-dasharray',4)

    //add group for x axis and move it to the bottom
    const xAxisGroup = chartArea.append('g')
        .attr('transform', `translate(0,${height})`);
    
    //add group for y axis
    const yAxisGroup = chartArea.append('g')
        .attr("transform", `translate(0, 0)`)

    //d3 line path generator
    const pathGenerator = d3.line()
        .x(function(d){ return x(d.x) })
        .y(function(d){ return y(d.y) })

    //get max y and max x
    var maxX = 0
    var maxY = 0
    var minX = new Date();
    chartData.lines.forEach(line => {
        line.data.forEach(point => {
            maxX = Math.max(point.x,maxX)
            maxY = Math.max(point.y,maxY)
            minX = Math.min(point.x,minX)
        })
    });


    const minY = chartData.minY ? chartData.minY : 0
    
    //scales
    const y = d3.scaleLinear()
        .range([0,height])
        .domain([maxY,minY])

    const x = d3.scaleTime()
        .range([0,width])
        .domain([minX,maxX])



    //build each line dynamically
    chartData.lines.forEach(line => {

    const circTransition = (d,i,n) => {

        return function(t){
            if(chartData.dots === false) return 0

            if(i === 0) return 1

            const numberOfPointsIn = line.data.length - 1;
            if(i * 1/numberOfPointsIn <= t) return 1

            return  0
        }
    }

    //tooltip
    const ttip = d3.tip()
    .attr('class', 'tip card')
    .html((e,d) => {
        const xLabel = xFormat(d.x)
        const yLabel = yFormat(d.y)
        let content = ''
        content += `<div class="name">${xLabel}</div>`;
        content += `<div class="cost">${yLabel}</div>`;
        return content;
    });

    graph.call(ttip);

        const path = graph.append('path')
            .attr("transform", `translate(${margin.left},${margin.top})`)

        //add circles
        const circs = graph.selectAll('circle.' + line.name)
            .data(line.data)
        
        const circSize = chartData.dotSize ? chartData.dotSize : 3

        //remove exit selction for circles
        circs.exit().remove()

        //update current circs
        circs.attr('r', circSize)
            .attr('fill', 'black')
            .attr('cx', d => x(d.x))
            .attr('cy', d => y(d.y))
            .attr("transform", `translate(${margin.left},${margin.top})`)
            .on('mouseover', ttip.show)
            .on('mouseout', ttip.hide)



        //append the enter selection to the DOM
        circs.enter()
            .append('circle')
            .attr('fill', 'black')
            .attr('cx', d => x(d.x))
            .attr('cy', d => y(d.y))
            .attr('r', circSize)
            .attr("transform", `translate(${margin.left},${margin.top})`)
            .attr('opacity',0)
            .on('mouseover.tip', ttip.show)
            .on('mouseover.lines', (e,d) => {
            xHoverLine
                .attr('x1',x(d.x))
                .attr('x2',x(d.x))
                .attr('y1',y(d.y))
                .attr('y2',height)

            yHoverLine
                .attr('x1',0)
                .attr('x2',x(d.x))
                .attr('y1',y(d.y))
                .attr('y2',y(d.y))

            hoverLineGroup.style('opacity', 1)
            


            })
            .on('mouseout.tip', ttip.hide)
            .on('mouseout.lines', (e,d) => {
                hoverLineGroup.style('opacity', 0)
            })
            .transition().duration(2000)
                .attrTween('opacity', circTransition)
                .ease(d3.easeLinear)
        
                

        // update path data
        path.data([line.data])
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 0)
            .attr('d', pathGenerator)
            .style('opacity',0.75)

        const pathLength = path.node().getTotalLength();

        path.attr("stroke-dasharray", pathLength + " " + pathLength)
        .attr("stroke-dashoffset", pathLength)
          .transition()
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)
          .attr('stroke-width', 2)
          .duration(2000)


    })

    const xTicks = chartData.xTicks ? chartData.xTicks : 5
    const yTicks = chartData.yTicks ? chartData.yTicks : 5

    //create and call the axes
    const xAxis = d3.axisBottom(x)
        .tickFormat(d => xFormat(d))
        .ticks(xTicks)


    const yAxis = d3.axisLeft(y)
        .tickFormat(d => yFormat(d))
        .ticks(yTicks)

    if(chartData.yTicks){
        yAxis.ticks(chartData.yTicks)
    }

    xAxisGroup.call(xAxis)
        .attr('class','chartAxis')
    yAxisGroup.call(yAxis)
        .attr('class','chartAxis')

    }
    }, [user, chartData])

    return (
        <div>
            <svg ref={ref}>
                <g className="chartArea">

                </g>
            </svg>
        </div>
    )
  }
 
export default LineChart;