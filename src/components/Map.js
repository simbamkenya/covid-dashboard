import React, {useEffect} from 'react'
import { select, selectAll, json, tsv, zoom } from 'd3'
import {geoPath, geoMercator, geoNaturalEarth1 } from 'd3-geo'
import { feature } from 'topojson-client'

function Map() {
    const svg = select('svg')
    const g =svg.append('g')
    const projection = geoNaturalEarth1()
    const pathGenerator = geoPath().projection(projection)

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
            // console.log(countries)
            const paths = g.selectAll('paths')
                .data(countries.features)
                .enter()
                .append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
            .append('title')
                .text(d => countryName[d.id])
    })

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
            <p>MAP</p>
            <svg width="960" height="500"></svg>
        </div>
    )
}

export default Map
