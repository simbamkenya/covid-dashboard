import React, { useEffect, useState } from 'react'
import Donut from './Donut'
import LineChart from './LineChart'
import Map from './Map'
import { format } from 'd3'

function Dash() {
  const formatNo = format(",")
  const formatPerc = format(".0%")
   
  const [deaths, setDeaths] = useState([])
  const [totalDeaths, setTotalDeaths] = useState(0)
  const [confirmed, setConfirmed] = useState(0)
  const [recovered, setRecovered] = useState([])
  const [totalRecovered, setTotalRecovered] = useState(0)
  const [pie, setPie] = useState(0)

  const [conf, setConf] = useState(0)
  const [totalConf, setTotalConf] = useState(0)


 useEffect(()=>{
  if(confirmed !== 0 && totalRecovered !== 0){
    const perct = totalRecovered/confirmed * 100
    setPie(formatPerc(perct))
  }
  if(conf !== 0 && totalConf !== 0){
    setConf(conf)
    setTotalConf(totalConf)
  }

 })

  return (
    <div>
      <div className='min-h-screen flex bg-gray-700 border-8'>
                {/* sidenav */}
                <div className='flex-shrink-0 w-64 bg-gray-700'>
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


                <div className='px-6 py-6 border-t border-gray-700'>
                    <div className='mb-4 w-full shadow-md rounded border-gray-400'>
                      <h4 className='text-sm text-white uppercase font-bold tracking-widest'>Confirmed Cases</h4>
                      <table className='text-white table-auto mt-2'>
                        <thead className='bg-gray-500 rounded-sm'>
                          <tr>
                            <th className='p-2 text-left font-bold'>Country</th>
                            <th className='p-2 text-left font-bold'>No of Cases</th>
                          </tr>
                        </thead>

                        <tbody className='divide-y divide-gray-300'>
                          {deaths.map((e, i) => (
                              <tr key={e.country}>
                                <td>{`${++i}.`} {e.country}</td>
                                <td>{formatNo(e.deaths)}</td>
                            </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    <div className='mb-4 w-full shadow-md rounded border-gray-400'>
                      <h4 className='text-sm text-white uppercase font-bold tracking-widest'>Death Cases</h4>
                      <table className='text-white table-auto mt-2'>
                        <thead className='bg-gray-500 rounded-sm'>
                          <tr>
                            <th className='p-2 text-left font-bold'>Country</th>
                            <th className='p-2 text-left font-bold'>No of Cases</th>
                          </tr>
                        </thead>

                        <tbody className='divide-y divide-gray-300'>
                          {deaths.map((e, i) => (
                              <tr key={e.country}>
                                <td>{`${++i}.`} {e.country}</td>
                                <td>{formatNo(e.deaths)}</td>
                            </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* <div className='mb-4 w-full shadow-md rounded border-gray-400'>
                      <h4 className='text-sm text-white uppercase font-bold tracking-widest'>No Recovered</h4>
                      <table className='text-white table-auto mt-2'>
                        <thead className='bg-gray-500 rounded-sm'>
                          <tr>
                            <th className='p-2 text-left font-bold'>Country</th>
                            <th className='p-2 text-left font-bold'>No of Cases</th>
                          </tr>
                        </thead>

                        <tbody className='divide-y divide-gray-300'>
                          {recovered.map((e, i) => (
                            <tr key={e.country}>
                              <td>{`${++i}.`} {e.country}</td>
                              <td>{formatNo(e.recovered)}</td>
                          </tr>
                          ))}
                        </tbody>
                      </table>
                    </div> */}
                </div>
 
                </div>
                {/* main */}
                <div className='flex-grow flex flex-col'>
                    <div id='container'>
                      <div className='bg-gray-900 px-4 py-6'>
                        <h1 className='text-white text-3xl font-bold  -tracking-widest text-right uppercase'>Covid-19 Dashboard</h1>
                      </div>
                      <div className='md:grid grid-cols-3 gap-3 ml-8 my-4 '>
                          <div className='px-4  py-2 bg-gray-900 text-white text-2xl rounded-lg mb-2 text-center'>
                            <h2>Confirmed Cases</h2>
                            <h2>{formatNo(confirmed)}</h2>
                          </div>
                          <div className='px-4  py-2 bg-gray-900 text-white text-2xl rounded-lg mb-2 text-center'>
                            <h2>Recovered Cases</h2>
                            <h2>{formatNo(totalRecovered)}</h2>
                          </div>
                          {/* <div className='px-4  py-2 bg-gray-900 text-white text-2xl rounded-lg mb-2 text-center'>
                            <h2>No of Deaths</h2>
                            <h2>{totalDeaths}</h2>
                          </div> */}

                          <div className='px-4  py-2 bg-gray-900 text-white text-2xl rounded-lg mb-2 text-center'>
                            <h2>Vaccinated</h2>
                            <h2>{formatNo(totalDeaths)}</h2>
                          </div>
                      </div>
                        <Map />
                    </div>

                    <div className='border-2 border-red-200 flex'>
                      <div className='w-3/5'>
                         <LineChart  setDeaths={setDeaths} setTotalDeaths={setTotalDeaths} setConfirmed={setConfirmed} setRecovered={setRecovered} setTotalRecovered={setTotalRecovered}/>
                        
                         <div className='mb-4 w-full shadow-md rounded border-gray-400'>
                            <h4 className='text-sm text-white uppercase font-bold tracking-widest'>No Recovered</h4>
                            <table className='text-white table-auto w-full mt-2'>
                              <thead className='bg-gray-500 rounded-sm'>
                                <tr>
                                  <th className='p-2 text-left font-bold'>Country</th>
                                  <th className='p-2 text-left font-bold'>No of Cases</th>
                                </tr>
                              </thead>

                              <tbody className='divide-y divide-gray-300'>
                                {recovered.map((e, i) => (
                                  <tr key={e.country}>
                                    <td>{`${++i}.`} {e.country}</td>
                                    <td>{formatNo(e.recovered)}</td>
                                </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                      </div>
                      <div className='border-4 border-green-500 w-2/5'>
                        <div className='flex justify-center items-center'>
                          <Donut pieD={pie} conf={conf} totalConf={totalConf}/>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Dash