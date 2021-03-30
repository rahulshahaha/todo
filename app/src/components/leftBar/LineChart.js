import React, { useRef, useEffect, useContext } from 'react';
import * as d3module from 'd3'
import d3tip from 'd3-tip'
import { FbContext } from '../../store/contexts/fbContext';
import { cleanHistory, dateFormatter, decimalFormatter, xScaleTime, yScaleLinear, getToolTip } from '../../chartHelper'
import { DataContext } from '../../store/contexts/dataContext';
import { ModalContext } from '../../store/contexts/modalContext';

const d3 = {
  ...d3module,
  tip: d3tip
}


const LineChart = () => {

    const { FBuser } = useContext(FbContext)
    const { history } = useContext(DataContext)
    const { modalStatus } = useContext(ModalContext)
    var chartData = null

    const chartClass = modalStatus.showChart ? 'block' : 'hidden'


    //clean history and add chart configs
    chartData = cleanHistory(history)
 
    //ref to root svg
    const ref = useRef()


    useEffect(() => {

      //graph size
      const graphHeight = 200
      const graphWidth = 500
      const margin = { top: 10, bottom: 20, left: 35, right: 20 };
      const width = graphWidth - margin.left - margin.right;
      const height = graphHeight - margin.top - margin.bottom;

      //select root svg
      const svg = d3.select(ref.current)
          .attr("viewBox", `0 0 ${graphWidth} ${graphHeight}`)
          
      //select group for graph
      const chartArea = svg.select('.chartArea')
          .attr('height', graphHeight)
          .attr('class','chartArea')
          .attr('width', graphWidth)
          .attr("transform", `translate(${margin.left},${margin.top})`);
      
      chartArea.selectAll('g').remove();

      //add group for data points
      const graph = chartArea
      .append("g")
      .attr("transform", `translate(-${margin.left},-${margin.top})`);

      //remove all current groups within graph
      graph.selectAll('g').remove();
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

        //scales
        const xScale = xScaleTime(chartData, width)
        const yScale = yScaleLinear(chartData, height)

        //d3 line path generator
        const pathGenerator = d3.line()
          .x(function(d){ return xScale(d.x) })
          .y(function(d){ return yScale(d.y) })


        //build each line dynamically
        chartData.lines.forEach(line => {

          //tooltip
          const ttip = getToolTip()
          graph.call(ttip);

          const path = graph.append('path')
              .attr("transform", `translate(${margin.left},${margin.top})`)

          //add circles
          const circs = graph.selectAll('circle.' + line.name)
              .data(line.data)
              
          const circSize = chartData.dotSize ? chartData.dotSize : 5

          //remove exit selction for circles
          circs.exit().remove()

          //update current circs
          circs.attr('r', circSize)
              .attr('fill', 'black')
              .attr('cx', d => xScale(d.x))
              .attr('cy', d => yScale(d.y))
              .attr("transform", `translate(${margin.left},${margin.top})`)
              .on('mouseover', ttip.show)
              .on('mouseout', ttip.hide)



          //append the enter selection to the DOM
          circs.enter()
              .append('circle')
              .attr('fill', 'black')
              .attr('cx', d => xScale(d.x))
              .attr('cy', d => yScale(d.y))
              .attr('r', circSize)
              .attr("transform", `translate(${margin.left},${margin.top})`)
              .attr('opacity',1)
              .on('mouseover.tip', ttip.show)
              .on('mouseover.lines', (e,d) => {
              xHoverLine
                  .attr('x1',xScale(d.x))
                  .attr('x2',xScale(d.x))
                  .attr('y1',yScale(d.y))
                  .attr('y2',height)

              yHoverLine
                  .attr('x1',0)
                  .attr('x2',xScale(d.x))
                  .attr('y1',yScale(d.y))
                  .attr('y2',yScale(d.y))

              hoverLineGroup.style('opacity', 1)
              })
              .on('mouseout.tip', ttip.hide)
              .on('mouseout.lines', (e,d) => {
                  hoverLineGroup.style('opacity', 0)
              })
          
              const pathLength = path.node().getTotalLength();

          // update path data
          path.data([line.data])
              .attr('fill', 'none')
              .attr('stroke', 'black')
              .attr('stroke-width', 2)
              .attr('d', pathGenerator)
              .style('opacity',0.75)
              .attr("stroke-dasharray", pathLength + " " + pathLength)

        

        })

        const xTicks = chartData.xTicks ? chartData.xTicks : 5
        const yTicks = chartData.yTicks ? chartData.yTicks : 5

        //axis label formatting functions
        var xFormat = chartData ? dateFormatter : (d) => d
        var yFormat = chartData ? decimalFormatter : (d) => d

        //create and call the axes
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d => xFormat(d))
            .ticks(xTicks)

        const yAxis = d3.axisLeft(yScale)
            .tickFormat(d => yFormat(d))
            .ticks(yTicks)


        xAxisGroup.call(xAxis)
            .attr('class','chartAxis')
        yAxisGroup.call(yAxis)
            .attr('class','chartAxis')

      }
    }, [FBuser, chartData])

    return (
        <div className="flex justify-center">
          <div className={chartClass + ' w-full'}>
              <svg ref={ref}>
                  <g className="chartArea">

                  </g>
              </svg>
          </div>
        </div>
    )
  }
 
export default LineChart;