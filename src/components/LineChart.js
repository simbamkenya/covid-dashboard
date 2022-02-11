import React, { useEffect } from 'react'
// import ddd from 'time_series_covid19_confirmed_global.csv'
import { select, selectAll, area, csv, max, line, scaleLinear, timeParse, scaleTime, axisBottom, axisLeft, extent } from 'd3'

function LineChart() {
  const url = 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv'

  // const csvUrl = process.env.PUBLIC_URL+"/time_series_covid19_confirmed_global.csv"
  const csvUrl = 'https://raw.githubusercontent.com/plotly/datasets/master/timeseries.csv'
  csv(csvUrl).then(data => console.log(data))
  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const parseDate = timeParse("%Y-%m-%d")

    // append the svg object to the body of the page
    const svg = select("#my_dataviz")
      .append("svg")
      // .attr("width", width + margin.left + margin.right)
      // .attr("height", height + margin.top + margin.bottom)
      .attr('viewBox', '0 0 500 400')
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    //Read the data
    csv(url,

      // When reading the csv, I must format variables:
      function (d) {
        return { date: parseDate(d.date), value: d.value }
      }).then(

        // Now I can use this dataset:
        function (data) {
          // console.log(Object.values(data))
          // Add X axis --> it is a date format
          const x = scaleTime()
            .domain(extent(data, d => d.date))
            .range([0, width]);

          svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(axisBottom(x));

          // Add Y axis
          const y = scaleLinear()
            .domain([0, max(data, d => +d.value)])
            .range([height, 0]);
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
            .on('on')

             //area
          // Add the area
          svg.append("path")
          .datum(data)
          .attr("fill", "#cce5df")
          .attr("stroke", "#69b3a2")
          .attr("stroke-width", 1.5)
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
          .attr("stop-color", "#D7F205")
          .attr("stop-opacity", 0.5);
      
        areaGradient
          .append("stop")
          .attr("offset", 0.9)
          .attr("stop-color", "#131B26")
          .attr("stop-opacity", 0);

            const lines = svg.append("line")
              .data(data)
              .attr("x1", d => x(d.date))
              .attr("y1", 0)
              .attr("x2", d => x(d.date))
              .attr("y2", height)
              .style("stroke", "red")
              .style("stroke-width", 2)
              .style('stroke-dasharray', 10)
              


        })
  }, [])

  return (
    <div id='my_dataviz' className='py-4 px-4'></div>
  )
}

export default LineChart