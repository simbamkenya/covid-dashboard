import React, { useEffect, useRef } from 'react'
// import ddd from 'time_series_covid19_confirmed_global.csv'
import { scaleBand, format, select, descending, ascending, selectAll, area, csv, max, line, scaleLinear, timeParse, scaleTime, axisBottom, axisLeft, extent, bisector, pointer } from 'd3'


function BarGraph({data}) {
    const contRef = useRef(null)
    const formatScale = format("~s")

    const margin = { top: 10, right: 30, bottom: 160, left: 50 },
        width = 1350 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    useEffect(() => {
    
    const svg = select(contRef.current)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
     
    // csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv').then((data) => {
            // X axis
        const x = scaleBand()
        .range([ 0, width*0.8])
        .domain(data.map(d => d.country))
        .padding(0.01);

        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style('color', 'white')
        .style('font-size','1.275em');

        // Add Y axis
        const y = scaleLinear()
        .domain([0, max(data, d => d.deaths)])
        .range([ height, 0]);
 
        svg.append("g")
        .call(axisLeft(y).tickFormat(formatScale))
        .style('color', 'white')
        .style('font-size','0.875em');

        // Bars
        svg.selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.country)+25)
        .attr("y", d => y(d.deaths))
        .attr("width", x.bandwidth()/2.5)
        .attr("height", d => height - y(d.deaths))
        .attr("fill", "#f545e9")
        
        
        // })

    }, [data])

  return (
    <svg ref={contRef} id="bargraph"></svg>
  )
}

export default BarGraph