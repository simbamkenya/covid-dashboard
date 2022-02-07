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
            <div className='min-h-screen flex bg-gray-200'>
                {/* sidenav */}
                <div className='flex-shrink-0 w-64 bg-gray-900'>
                    <a>
                        <div className='flex items-center h-16 px-4 bg-gray-900 text-xl text-white font-medium'>
                        <svg className='relative w-8 h-8 fill-current svg-icon' viewBox="0 0 20 20">
                            <path d="M10,2.172c-4.324,0-7.828,3.504-7.828,7.828S5.676,17.828,10,17.828c4.324,0,7.828-3.504,7.828-7.828S14.324,2.172,10,2.172M10,17.004c-3.863,0-7.004-3.141-7.004-7.003S6.137,2.997,10,2.997c3.862,0,7.004,3.141,7.004,7.004S13.862,17.004,10,17.004M10,8.559c-0.795,0-1.442,0.646-1.442,1.442S9.205,11.443,10,11.443s1.441-0.647,1.441-1.443S10.795,8.559,10,8.559 M10,10.619c-0.34,0-0.618-0.278-0.618-0.618S9.66,9.382,10,9.382S10.618,9.661,10.618,10S10.34,10.619,10,10.619 M14.12,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.647,1.443,1.442,1.443s1.442-0.647,1.442-1.443S14.915,8.559,14.12,8.559 M14.12,10.619c-0.34,0-0.618-0.278-0.618-0.618s0.278-0.618,0.618-0.618S14.738,9.661,14.738,10S14.46,10.619,14.12,10.619 M5.88,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.646,1.443,1.442,1.443S7.322,10.796,7.322,10S6.675,8.559,5.88,8.559 M5.88,10.619c-0.34,0-0.618-0.278-0.618-0.618S5.54,9.382,5.88,9.382S6.498,9.661,6.498,10S6.22,10.619,5.88,10.619"></path>
                        </svg>
                        <div className='ml-2 pt-[2px]'>Covid 19</div>
                        </div>
                    </a>

                <div>
                    <div className='px-2 py-2'></div>
                </div>

                <div className='px-6 py-6 text-white'>
                    <a>Phonebbok</a>
                </div>

                <div className='px-6 py-6 border-t border-gray-700'>
                    <h4 className='text-sm text-gray-600 uppercase font-bold tracking-widest'>Contact</h4>
                    <ul className='mt-3 text-white'>
                        <li className='mt-3'><a href="">Activities</a></li>
                        <li className='mt-3'><a href="">Recording</a></li>
                        <li className='mt-3'><a href="">Setting</a></li>
                    </ul>
                </div>

                
                </div>
                {/* main */}
                <div className='flex-grow flex flex-col'>
                    <div id='container'>
                        <p className='text-3xl font-bold underline text-white uppercase'>Map</p>
                        <svg ref={svgRef} width="960" height="500"></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Map
