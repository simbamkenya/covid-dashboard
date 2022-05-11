import React, {useEffect, useRef} from 'react'
import  {pie, arc, scaleOrdinal, select} from "d3"

function Donut({deaths, pieD, totalConf, formatPerc}) {

    var margin = { top: 20, right: 10, bottom: 20, left: 10 },
    width = 250 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;
    const recovered = (totalConf-deaths)

const pieChart = useRef(null)

useEffect(() => {

    
    const data = [
        {outcome: "Recovered", count: 98.5 },
        {outcome: "Confirmed", count: 100},
                ];
        // console.log('pie',data[0])

  const pieCer = formatPerc((recovered/totalConf) *100)

  const pieData = pie()
        .value((d) => d.count)(data)

    const arcGenerator = arc()
        .innerRadius(50)
        .outerRadius(70);

    const colors = scaleOrdinal(["pink", "cornflowerblue"])

    //setting the stage
    const svg = select(pieChart.current)
            .append("g")
            .attr('transform', `translate(${width/2}, ${height/2})`)
            .style("background-color", "green")
      
    //tooltip
    const tooltip = select("#chartArea")
        .append("div")
        .style("visibility", "hidden")
        .style("position", "absolute")
        .style("background-color", "grey")

    //drawing pie
    svg.selectAll("path")
        .data(pieData)
        .join("path")
            .attr("d", arcGenerator)
            .attr("fill", (d,i) => colors(i))
            // .attr("stroke", "white")
            .attr("class", "round")
            

    svg.append("text")
            .attr("text-anchor", "middle")
            .text( 98.5 + "%").attr('class', 'font-medium text-3xl fill-orange-400 text-white')
            // .text('HHHHHHH')
            .attr("dominant-baseline", "middle")
            // console.log(pieData)

    // svg.append("circle")
    //     .attr("cx", 100)
    //     .attr("cy",height/2)
    //     .attr("r", 8)
    //     .style("fill", "pink")
    // svg.append("circle")
    //     .attr("cx", 20)
    //     .attr("cy", height/2)
    //     .attr("r", 8)
    //     .style("fill", "cornflowerblue")
        

    // svg.append('text')
    //     .attr('y', height/2 - 20)
    //     .attr('x', width/2)
    //     .style('fill', 'white')
    //     .html('Recovered')
    //     .attr('class', 'legend-text')
    // svg.append('text')
    //     .attr('y', height/2 - 20)
    //     .attr('x', width/2)
    //     .style('fill', 'white')
    //     .html('Not Recovered')
    //     .attr('class', 'legend-text')

    //     console.log('peicer', pieCer)
           
}, [pieD])
  return (
      <div>
          <h1 className='text-white text-xl font-medium text-center'>Percentage Recovered</h1>
         <svg ref={pieChart} viewBox={`0 0 ${width} ${height}`}  preserveAspectRatio='xMidYMid meet'></svg> 
      </div>
        
  )
}

export default Donut




