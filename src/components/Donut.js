import React, {useEffect, useRef} from 'react'
import  {pie, arc, scaleOrdinal, select} from "d3"

function Donut() {

    var margin = { top: 20, right: 10, bottom: 20, left: 10 },
    width = 350 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;
     

    const data = [
                    {country: "Kenya", count: 4},
                    {country: "Tanzania", count: 6},
                ];

const pieChart = useRef()

useEffect(() => {
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
        .attr("background-color", "green")
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
            .text(97 + "%").attr('class', 'font-medium text-3xl fill-orange-400')
            .attr("dominant-baseline", "middle")
           
})
  return (
        <svg ref={pieChart} viewBox="0 0 200 200"  preserveAspectRatio='xMidYMid meet'></svg>
  )
}

export default Donut




