import React, { useEffect, useRef } from 'react'
// import ddd from 'time_series_covid19_confirmed_global.csv'
import { select, descending, ascending, selectAll, area, csv, max, line, scaleLinear, timeParse, scaleTime, axisBottom, axisLeft, extent, bisector, pointer } from 'd3'

function LineChart({setTotalDeaths, setDeaths, setConfirmed, setRecovered, setTotalRecovered}) {
  const lineRef = useRef(null)

  const url = 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv'

  // const csvUrl = process.env.PUBLIC_URL+"/time_series_covid19_confirmed_global.csv"
  const csvUrl = 'https://raw.githubusercontent.com/plotly/datasets/master/timeseries.csv'
  // csv(csvUrl).then(data => console.log(data))
  
    csv('time_series_covid19_confirmed_global.csv').then(data =>{
      data.forEach(e => {
        delete e['Province/State']
        delete e['Lat']
        delete e['Long']
      })

      data.forEach(e => {
        for (let key in e){
        if(key != 'Country/Region'){
          e[key] = parseInt(e[key])
        }
        }
      })
      const countries = []

      data.forEach(e => {
        for(let k in e){
          if(!countries.includes(e['Country/Region']))
          countries.push(e['Country/Region'])
        }
      })
      
      const timeFrame = []

      data.forEach(e => {
        for(let k in e){
          if(k !== 'Country/Region'){
            timeFrame.push(k)
          }
        }
      })
      // console.log(timeFrame)

      const last = timeFrame[timeFrame.length - 1]
     
      const latestConfirmed = []

      data.forEach(e => {
        for(let k in e){
          if(k === last){
           latestConfirmed.push(+e[k]) 
          }
        }
      })
     const totalConfirmed =  latestConfirmed.reduce((acc, x) => acc + x, 0)

      setConfirmed(totalConfirmed)

      const confirmedByCountry = []

      data.forEach(e => {
        for(let k in e){
          if(k === last){
            confirmedByCountry.push({country: e['Country/Region'], confirmed: +e[last]})
          }
        }
      })
      console.log(confirmedByCountry)

  })

  csv('time_series_covid19_deaths_global.csv').then(data => {

    data.forEach(e => {
      delete e['Province/State']
      delete e['Lat']
      delete e['Long']
    })

      const columns = []
      data.forEach(e => {
        for(let k in e){
          if(k !== 'Country/Region'){
            columns.push(k)
          }
        }
      })

    // console.log(columns)
    const latest = columns[columns.length - 1]
    // console.log(columns[columns.length - 1])
    const latestDeaths = []
    
      data.forEach(e => {
        for(let k in e){
          if(k === latest){
            latestDeaths.push(+e[k])
          }
        }
      })
    const totalDeaths=  latestDeaths.reduce((acc, x) => acc + x, 0)
      // console.log(totalDeaths)

    const deathsByCountry = []

    data.forEach(e => {
      for(let k in e){
        if(k === latest){
          deathsByCountry.push({country: e['Country/Region'], deaths: +e[latest]})
        }
      }
    })
        // console.log(deathsByCountry)
      
      const confirmedDeaths = deathsByCountry.sort((a, b) => b.deaths - a.deaths).slice(0,10);
      setDeaths(confirmedDeaths)
      setTotalDeaths(totalDeaths)

  })

  csv('time_series_covid19_recovered_global.csv').then(data => {
      data.forEach(e => {
        delete e['Province/State']
        delete e['Lat']
        delete e['Long']
      })

      const columns = []
      data.forEach(e => {
        for(let k in e){
          if(k !== 'Country/Region'){
            columns.push(k)
          }
        }
      })
   
      const latest = columns[columns.length - 1]

      const recovered = []
        
        data.forEach(e => {
          for(let k in e){
            if(k === latest){
              recovered.push(+e[k])
            }
          }
        })


        const recoveredByCountry = []

        data.forEach(e => {
          for(let k in e){
            if(k === latest){
              recoveredByCountry.push({country: e['Country/Region'], recovered: +e[latest]})
            }
          }
        })
      
      const confirmedRecovered = recoveredByCountry.sort((a, b) => b.recovered - a.recovered).slice(0,10);
      const totalRecovered =  recovered.reduce((acc, x) => acc + x, 0)

      setTotalRecovered(totalRecovered)
      setRecovered(confirmedRecovered)
    

   })
   csv('time_series_covid19_confirmed_global_line.csv').then(data => {
      data.forEach(e => {
        delete e['Province/State']
        delete e['Lat']
        delete e['Long']
      })

      console.log(typeof data)

      const d = []

      // data.forEach(e => {

      // })

   })
   

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const parseDate = timeParse("%Y-%m-%d")

    // append the svg object to the body of the page
    const svg = select('#my_dataviz')
      .append("svg")
      // .attr("width", width + margin.left + margin.right)
      // .attr("height", height + margin.top + margin.bottom)
      .attr('viewBox', '0 0 600 450')
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

            // console.log(data)

          svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(axisBottom(x)).attr('class', 'text-white');

         const focus = svg.append('g')
            .attr('class', 'focus')
            .style('display', 'none');

          focus.append('line')
            .classed('x', true);

        //  const lines = svg.append("line")
        //     .data(data)
        //     .attr("x1", d => x(d.date))
        //     .attr("y1", 0)
        //     .attr("x2", d => x(d.date))
        //     .attr("y2", height)
        //     .style("stroke", "red")
        //     .style("stroke-width", 2)
        //     .style('stroke-dasharray', 10)

          // const handleMouseMove = (e) => {
          //   const bisectDate =  bisector(d => d.date).left;

          //   const x0 = x.invert(pointer(e)[0]);
          //   const i = bisectDate(data, x0, 1);
          //   const d0 = data[i - 1];
          //   const d1 = data[i];
          //   const d = x0 - d0.date > d1.date - x0 ? d1 : d0;

          // }

          // Add Y axis
          const y = scaleLinear()
            .domain([0, max(data, d => +d.value)])
            .range([height, 0])
            
            // .format(".2s")
            // .ticks()
            // .tickFormat(".1f");
            
            
          svg.append("g")
            .call(axisLeft(y).ticks(20, "s").tickSize(-width).ticks(6)).attr('class', 'text-white')
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
  }, [])

  return (
      <div  ref={lineRef} id='my_dataviz' className='py-4 px-4 border-orange-700 border-4'></div>
  )
}

export default LineChart