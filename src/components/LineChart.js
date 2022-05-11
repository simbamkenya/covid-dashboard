import React, { useEffect, useRef } from 'react'
// import ddd from 'time_series_covid19_confirmed_global.csv'
import { csv} from 'd3'

function LineChart({setRecovered, setTotalRecovered}) {
  const lineRef = useRef(null)

  const ur = 'confirmed-line.csv'
  
   

  //  csv('time_series_covid19_confirmed_global_line.csv').then(data => {
  //     data.forEach(e => {
  //       delete e['Province/State']
  //       delete e['Lat']
  //       delete e['Long']
  //     })

  //     const obj = []
  //     data.forEach(e => {
  //       for(let k in e){
  //         if(k === 'total'){
  //           obj.push(e)
  //         }
  //       }
  //     })
      
  //     const result = data.reduce(function(acc, x) {
  //       var id = acc[x['Country/Region']]
  //       if (id) {
  //           id['Country/Region'] = x['Country/Region']
  //       } else {
  //           acc[x['Country/Region']] = x
  //       }
  //       return acc
  //       },[])

  //       const r = result.total
      
  //       const res = []

  //     result.forEach(e => {
  //       for(let k in e){
  //         // if(k !== 'Country/Region'){
  //         //   res.push({date: k, value: +e[k]})
  //         // }
  //         res.push({date: Object.keys(result.total).slice(0, result.total.length -1)})
  //       }
  //     })
  //     // console.log(Object.keys(result.total))
  //     console.log(Object.keys(result.total))
      

  //  })
   

  return (
      // <div  ref={lineRef} id='my_dataviz' className='py-4 px-4 border-orange-700 border-4'></div>
     <div></div>
  )
}

export default LineChart