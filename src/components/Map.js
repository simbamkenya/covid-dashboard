import React, {useEffect, useState, useRef} from 'react'
import { select, selectAll, json, tsv, zoom, csv, csvParse, pointer, max, scaleLog, scaleLinear, format } from 'd3'
import {geoPath, geoMercator, geoNaturalEarth1 } from 'd3-geo'
import { feature } from 'topojson-client'

function Map() {
    const csvUrl = "https://data.humdata.org/hxlproxy/api/data-preview.csv?url=https%3A%2F%2Fraw.githubusercontent.com%2FCSSEGISandData%2FCOVID-19%2Fmaster%2Fcsse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_covid19_confirmed_global.csv&filename=time_series_covid19_confirmed_global.csv"

    const [data, setData] = useState()

    const svgRef = useRef(null)
    const formatNumber = format(',')
    

    // const fetchData = async (url) => {
    //     const response = await fetch(url)
    //     return await response.text()
    // }

    // fetchData(csvUrl).then(text => {
    //     const data = csvParse(text)
    // })
    
    // const markers = [
    //     {long: 9.083, lat: 42.149}, // corsica
    //     {long: 7.26, lat: 43.71}, // nice
    //     {long: 2.349, lat: 48.864}, // Paris
    //     {long: -1.397, lat: 43.664}, // Hossegor
    //     {long: 3.075, lat: 50.640}, // Lille
    //     {long: -3.83, lat: 58}, // Morlaix
    //   ];
    
    
    useEffect(() => {
        csv(csvUrl).then(data => {
            setData(data)
            // console.log(data.columns)
        })
    }, [])

// console.log(data)
    useEffect(() => {
        const svg = select(svgRef.current)
        const g =svg.append('g')
        const projection = geoNaturalEarth1()
        const pathGenerator = geoPath().projection(projection)

        //bubble scale 
        const radialScale = scaleLinear()
            .domain([0, 77000000])
            .range([0, 20])
            // console.log(radialScale.domain())
        

        svg.call(zoom().on('zoom', (event) => {
            g.attr('transform', event.transform)
            // console.log('zzz')
        }))

        // d3.zoom()
        // .on('zoom', (event) => {
        //   map.attr('transform', event.transform);
        // })
        // .scaleExtent([1, 40]);
        
        Promise.all([
            tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
            json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
        ]).then(([tsvData, topoJSONdata]) => {
            // console.log(tsvData)
            // console.log(topoJSONdata)

            const countryName = tsvData.reduce((accumulator, d) => {
                accumulator[d.iso_n3] = d.name;
                return accumulator;
            }, {})

            // const countryName = {};
            // tsvData.forEach(d => {
            //     countryName[d.iso_n3] = d.name
            // })
            

            const countries = feature(topoJSONdata, topoJSONdata.objects.countries)
                const paths = g.selectAll('paths')
                    .data(countries.features)
                    .enter()
                    .append('path')
                    .attr('class', 'country')
                    .attr('d', pathGenerator)
                .append('title')
                    .text(d => countryName[d.id])

           

                //tooltip events
                const handleMouseOver = () => {
                    toolTip.style('opacity', 1)
                }
                const handleMouseMove = (e, d) => {
                    toolTip.html( "Country: " + d['Country/Region'] + '<br>'+ 'Confirmed cases: ' + formatNumber(d['2/5/22']))
                        .style('left', (e.pageX)+'px')
                        .style('top', (e.pageY)+'px')
                        .style('class', 'font-bold')
                }
                const handleMouseEnter = (d) => {
                    toolTip.style('opacity', 1)
                }
                const handleMouseLeave = (d) => {
                    toolTip.style('opacity', 0)
                }

                g.selectAll('myCircles')
                .data(data)
                .enter()
                .append("circle")
                    .attr("cx", d => projection([d.Long, d.Lat])[0])
                    .attr("cy", d => projection([d.Long, d.Lat])[1])
                    // .attr("r", d => radialScale(d['2/5/22']))
                    .attr("r", 10)
                    .style("fill", "#ff726f")
                    .style('opacity', 0.6)
                    .attr("stroke", "#69b3a2")
                    .attr("stroke-width", 0.2)
                    .attr("fill-width", 0.4)
                .on('mouseover', handleMouseOver)
                .on('mouseleave', handleMouseLeave)
                .on('mousemove', handleMouseMove)

                   const body = select('body').style('position', 'relative')
                    const toolTip = select('#container')
                    .append('div')
                    .attr('class', 'tooltip bg-gray-900 text-white shadow-lg rounded px-4 py-4 flex')
                    .style('opacity', 0)
                    // .style('background-color', "white")
                    // .style('border', 'solid')
                    // .style('border-width', '2px')
                    // .style('border-radius', '5px')
                    // .style('padding', '5px')
                    // .style('width', '100px')
                    .style("position", "absolute")
                    // .html('h1', 'Title was me')
        })


    }, [data])

    // tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv')
    //     .then(data => console.log(data))

    // json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
    //     .then(data => {
    //        const countries = feature(data, data.objects.countries)
    //         // console.log(countries)
    //         const paths = svg.selectAll('paths')
    //             .data(countries.features)
    //             .enter()
    //             .append('path')
    //             .attr('d', pathGenerator)
    //     })
    return (
        

        <div>
            <div className='max-w-full border-2 border-green-400 flex bg-gray-200'>
                {/* sidenav */}

                {/* main */}
                <div className='flex-grow flex flex-col'>
                    <div id='container'>
                        <p className='text-3xl font-bold underline text-red-500 uppercase text-center mb-4'>Covid Cases Around the Globe</p>
                        <svg ref={svgRef} viewBox="0 0  980 500" preserveAspectRatio ="xMidYMid meet"></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Map
