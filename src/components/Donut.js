import React, {useEffect, useRef} from 'react'
import  {pie, arc, scaleOrdinal, select} from "d3"

function Donut() {
    var margin = { top: 20, right: 10, bottom: 20, left: 10 },
        width = 350 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;
         

        const data = [
                        {country: "Kenya", count: 4},
                        {country: "Tanzania", count: 6},
                        {country: "Burundi", count: 2}
                    ];

    const pieChart = useRef()

    useEffect(() => {
      const pieData = pie()
            .value((d) => d.count)(data)
    
        const arc = arc()
            .innerRadius(50)
            .outerRadius(70);

        const colors = scaleOrdinal(["pink", "cornflowerblue", "tomato"])

        //setting the stage
        const svg = select(pieChart.current)
            .attr("width", width)
            .attr("height", height)
            .attr("background-color", "green")
            .append("g")
                .attr('transform', 'translate(' + 100 + ',' + 70 + ')')
          
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
                .attr("d", arc)
                .attr("fill", (d,i) => colors(i))
                .attr("stroke", "white")
                .on("mouseover", (e,d)=>{
                    tooltip.style("visibility", "visible")
                        .text(`${d.data.country}:`  +  `${d.data.count}`)
                })
                .on("mousemove", (e,d) => {
                    tooltip.style("top", (e.pageY -50) + 'px')
                            .style("left", (e.pageX -50) + 'px')
                })
                .on("mouseout", () => {
                    tooltip.style("visibility", "hidden")
                })
    
    })
    
    
    return (
     <div id="chartArea">
        <svg ref={pieChart}></svg>
     </div>
    )
}

export default Donut
