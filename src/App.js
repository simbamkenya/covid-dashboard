import React, { useState } from 'react';
import Dash from './components/Dash'
import { BrowserRouter,  Routes, Route, Link } from "react-router-dom";
import { csv } from 'd3'
import './App.css';
import Cases from './components/Cases';


function App() {
const [deaths, setDeaths] = useState([])
const [recovered, setRecovered] = useState([])
const [totalDeaths, setTotalDeaths] = useState(0)
const [confirmed, setConfirmed] = useState(0)
const [totalRecovered, setTotalRecovered] = useState(0)



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

csv('time_series_covid19_deaths_global.csv')
  .then(data => {
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

  })

 csv('time_series_covid19_confirmed_global_line.csv').then(data => {
      data.forEach(e => {
        delete e['Province/State']
        delete e['Lat']
        delete e['Long']
      })

      const obj = []
      data.forEach(e => {
        for(let k in e){
          if(k === 'total'){
            obj.push(e)
          }
        }
      })
      
      const result = data.reduce(function(acc, x) {
        var id = acc[x['Country/Region']]
        if (id) {
            id['Country/Region'] = x['Country/Region']
        } else {
            acc[x['Country/Region']] = x
        }
        return acc
        },[])

        const r = result.total
      
        const res = []

      result.forEach(e => {
        for(let k in e){
          // if(k !== 'Country/Region'){
          //   res.push({date: k, value: +e[k]})
          // }
          res.push({date: Object.keys(result.total).slice(0, result.total.length -1)})
        }
      })
      // console.log(Object.keys(result.total))
      console.log('ooop', Object.keys(result.total))
      

   })
   


  return (
    <div className="antialiased text-gray-900">
      {/* <Dash /> */}
      {/* <Cases deaths={deaths}/> */}
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dash deaths={totalDeaths} setDeaths={setDeaths} confirmed={confirmed} totalRecovered={totalRecovered}/>} exact />
            <Route path="cases" element={<Cases deaths={deaths} recovered={recovered}/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
