import React, { useState } from 'react';
import Dash from './components/Dash'
import { BrowserRouter,  Routes, Route, Link } from "react-router-dom";
import { csv } from 'd3'
import './App.css';
import Cases from './components/Cases';


function App() {
const [deaths, setDeaths] = useState([])
const [totalDeaths, setTotalDeaths] = useState(0)

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

  return (
    <div className="antialiased text-gray-900">
      {/* <Dash /> */}
      {/* <Cases deaths={deaths}/> */}
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dash deaths={totalDeaths} setDeaths={setDeaths}/>} exact />
            <Route path="cases" element={<Cases deaths={deaths}/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
