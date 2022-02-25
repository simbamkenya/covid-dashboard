import React, {useEffect, useRef} from 'react'
import  {pie, arc, scaleOrdinal, select} from "d3"

function Donut({conf, totalConf, pieD}) {

    var margin = { top: 20, right: 10, bottom: 20, left: 10 },
    width = 350 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

    

const pieChart = useRef()

useEffect(() => {

    
    const data = [
        {outcome: "Recovered", count: conf},
        {outcome: "Confirmed", count: totalConf},
                ];

  const pieData = pie()
        .value((d) => d.count)(data)

    const arcGenerator = arc()
        .innerRadius(50)
        .outerRadius(70);

    const colors = scaleOrdinal(["pink", "cornflowerblue"])

    //setting the stage
    const svg = select(pieChart.current)

        // .attr("width", width)
        // .attr("height", height)
        svg.attr("background-color", "green")
        .append("g")
            .attr('transform', 'translate(' + 100 + ',' + 120 + ')')
      
    //tooltip
    const tooltip = select("#chartArea")
        .append("div")
        .style("visibility", "hidden")
        .style("position", "absolute")
        .style("background-color", "grey")

    //drawing pie
    svg.append("g")
        .selectAll("path")
        .data(pieData)
        .join("path")
            .attr("d", arcGenerator)
            .attr("fill", (d,i) => colors(i))
            // .attr("stroke", "white")
            .attr("class", "round")

            svg.append("text")
            .attr("text-anchor", "middle")
            .text(pieD + "%").attr('class', 'font-medium text-3xl fill-orange-400')
            .attr("dominant-baseline", "middle")
            console.log(pieData)
           
}, [pieD, conf, totalConf])
  return (
      <div>
          <h1 className='text-white text-xl font-medium text-center'>Percentage Recovered</h1>
         <svg ref={pieChart} viewBox="0 0 200 200"  preserveAspectRatio='xMidYMid meet'></svg> 
      </div>
        
  )
}

export default Donut




