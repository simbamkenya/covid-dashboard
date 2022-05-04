import React, { useEffect, useRef } from 'react'
// import ddd from 'time_series_covid19_confirmed_global.csv'
import { format, select, descending, ascending, selectAll, area, csv, max, line, scaleLinear, timeParse, scaleTime, axisBottom, axisLeft, extent, bisector, pointer } from 'd3'

function Line() {
    const ur = 'confirmed-line.csv'
    const contRef = useRef(null)
    useEffect(() => {
        const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const parseDate = timeParse("%m/%d/%Y")
    const formatScale = format("~s")

    // append the svg object to the body of the page
    const svg = select(contRef.current)
      // .attr("width", width + margin.left + margin.right)
      // .attr("height", height + margin.top + margin.bottom)
      // .attr('viewBox', '0 0 800 600')
      .attr('viewBox', `0 0 ${width + 150} ${height + 100}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
        csv(ur,function (d) {
            return { date: parseDate(d.date), value: d.value }
            
            }).then(
               
              // Now I can use this dataset:
              function (data) { console.log('pp', typeof data[0])
                // X axis
                const x = scaleTime()
                  .domain(extent(data, d => d.date))
                  .range([0, width]);
                  console.log(x.domain())
      
                svg.append("g")
                  .attr("transform", `translate(0, ${height})`)
                  .call(axisBottom(x))
                  .attr('class', 'text-white')
                  .style('font-size', '0.875em');
      
               const focus = svg.append('g')
                  .attr('class', 'focus')
                  .style('display', 'none');
      
                focus.append('line')
                  .classed('x', true);
      
                // Y axis
                const y = scaleLinear()
                  .domain([0, max(data, d => +d.value)])
                  .range([height, 0])
                          
                  
                svg.append("g")
                  .call(axisLeft(y)
                  .tickFormat(formatScale)
                  .ticks(20, "s")
                  .ticks(6))
                  .attr('class', 'text-white')
                  .style('font-size', '0.875em')
                // Add the line
                svg.append("path")
                  .datum(data)
                  .attr("fill", "none")
                  .attr("stroke", "steelblue")
                  .attr("stroke-width", 1.5)
                  .attr("d", line()
                    .x(d => x(d.date))
                    .y(d => y(d.value))
                  )
                  
      
                   //area
                // Add the area
                svg.append("path")
                .datum(data)
                .attr("fill", "#cce5df")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 1)
                .attr("d", area()
                  .x(d => x(d.date))
                  .y0(y(0))
                  .y1(d =>  y(d.value))
                  )
                  .style("fill", "url(#areaGradient)")
      
                //area gradident
                let areaGradient = svg
                .append("defs")
                .append("linearGradient")
                .attr("id", "areaGradient")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%");
      
                areaGradient
                .append("stop")
                .attr("offset", 0.2)
                .attr("stop-color", "#0072ff")
                .attr("stop-opacity", 0.5);
      
              areaGradient
                .append("stop")
                .attr("offset", 0.9)
                .attr("stop-color", "#00c6ff")
                .attr("stop-opacity", 0);
      
              })
    })
  return (
    <div className=''>
      <span className='text-lg text-white capitalize text-center font-semibold'>Covid 19 cases over time</span>
      <svg ref={contRef}></svg>
    </div>
    
  )
}

export default Line