import React, { useEffect } from 'react'
import { select, selectAll, csv, max, line, scaleLinear,timeParse, scaleTime, axisBottom, axisLeft, extent } from 'd3'

function LineChart() {
    const url = 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv'
    
    
    useEffect(() => {
// set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    const parseDate = timeParse("%Y-%m-%d")

    // append the svg object to the body of the page
    const svg = select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    //Read the data
    csv(url,

    // When reading the csv, I must format variables:
    function(d){
    return { date : parseDate(d.date), value : d.value }
    }).then(
        
    // Now I can use this dataset:
    function(data) {
console.log(Object.values(data))
    // Add X axis --> it is a date format
    const x = scaleTime()
    .domain(extent(data, d => d.date))
    .range([ 0, width ]);

    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(axisBottom(x));

    // Add Y axis
    const y = scaleLinear()
    .domain([0, max(data, d =>  +d.value)])
    .range([ height, 0 ]);
    svg.append("g")
    .call(axisLeft(y));

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

    })
    }, [])

  return (
    <div id='my_dataviz'></div>
  )
}

export default LineChart