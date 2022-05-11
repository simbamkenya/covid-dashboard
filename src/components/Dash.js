import React, { useEffect, useState } from 'react'
import Donut from './Donut'
import LineChart from './LineChart'
import Map from './Map'
import { format } from 'd3'
import Cases from './Cases'
import Line from './Line'
import BarGraph from './BarGraph'
import Sidebar from './Sidebar'


function Dash({deaths, setDeaths, confirmed, totalRecovered}) {


  // <Route path="/home" component={Home} />
  const formatNo = format(",")
  const formatPerc = format(".0%")

  // const [deaths, setDeaths] = useState([])
const [totalDeaths, setTotalDeaths] = useState(0)
  
 
 
  const [pie, setPie] = useState(0)

  const [conf, setConf] = useState(0)
  const [totalConf, setTotalConf] = useState(0)

  const shareRecovered = ((confirmed - deaths) /confirmed)*100


 useEffect(()=>{
  if(confirmed !== 0 && totalRecovered !== 0){
    const perct = totalRecovered/confirmed * 100
    setPie(formatPerc(perct))
  }
  if(conf !== 0 && totalConf !== 0){
    setConf(conf)
    setTotalConf(totalConf)
  }
 
 },[])

  return (
    <div>
      <div className='min-h-screen bg-gray-700 border-8 flex rounded-md'>
                {/* sidenav */}
                <Sidebar />
                {/* <div className='flex-shrink-0 w-full md:w-32 bg-green-200'>
                    <a>
                        <div className='flex items-center h-20 px-4 bg-gray-900 text-xl text-white font-medium'>
                        <svg className='relative w-8 h-8 fill-current svg-icon' viewBox="0 0 20 20">
                            <path d="M10,2.172c-4.324,0-7.828,3.504-7.828,7.828S5.676,17.828,10,17.828c4.324,0,7.828-3.504,7.828-7.828S14.324,2.172,10,2.172M10,17.004c-3.863,0-7.004-3.141-7.004-7.003S6.137,2.997,10,2.997c3.862,0,7.004,3.141,7.004,7.004S13.862,17.004,10,17.004M10,8.559c-0.795,0-1.442,0.646-1.442,1.442S9.205,11.443,10,11.443s1.441-0.647,1.441-1.443S10.795,8.559,10,8.559 M10,10.619c-0.34,0-0.618-0.278-0.618-0.618S9.66,9.382,10,9.382S10.618,9.661,10.618,10S10.34,10.619,10,10.619 M14.12,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.647,1.443,1.442,1.443s1.442-0.647,1.442-1.443S14.915,8.559,14.12,8.559 M14.12,10.619c-0.34,0-0.618-0.278-0.618-0.618s0.278-0.618,0.618-0.618S14.738,9.661,14.738,10S14.46,10.619,14.12,10.619 M5.88,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.646,1.443,1.442,1.443S7.322,10.796,7.322,10S6.675,8.559,5.88,8.559 M5.88,10.619c-0.34,0-0.618-0.278-0.618-0.618S5.54,9.382,5.88,9.382S6.498,9.661,6.498,10S6.22,10.619,5.88,10.619"></path>
                        </svg>
                        <div className='ml-2 pt-[2px]'>Covid</div>
                        </div>
                    </a>


                    <div className='flex flex-col space-y-4 bg-red-200'>
                      <a className=' list-none flex items-center justify-center space-y-4 mt-4'>
                        <span className='flex-1 px-4 py-2 text-lg bg-slate-600 text-white rounded-md'>Overview</span>
                      </a>
                      <a className='list-none flex items-center justify-center space-y-4'>
                        <span className='flex-1 px-4 py-2 text-lg bg-slate-600 text-white rounded-md'>Cases</span>
                      </a>
                    </div>


                    <div className='px-6 py-6 border-t border-gray-700'>
                      <h1> who lets</h1>
                    </div>

                </div> */}
                {/* main */}
                <div className='flex-grow flex flex-col'>
                    <div id='container' className=' min-h-min'>
                      <div className='bg-gray-900 px-4 py-12 hidden md:block'>
                        {/* <h1 className='text-white text-lg font-bold  text-right uppercase'>Covid-19 Dashboard</h1> */}
                        <div className='float-right'>
                         <img class="object-cover w-8 h-8 rounded-full" src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4" alt="Ahmed Kamel"/>
                        </div>

                      </div>
                      <div className='md:grid grid-cols-4 gap-3 mx-8 my-4 '>
                          <div className='px-4  py-2 bg-gray-900 text-white text-2xl rounded-lg mb-2 text-center flex flex-col justify-start'>
                            <span className='text-lg text-gray-200 py-2'>Confirmed Cases</span>
                            <span className='text-4xl text-red-500 '>{formatNo(confirmed)}</span>
                          </div>
                          <div className='px-4  py-2 bg-gray-900 text-white text-2xl rounded-lg mb-2 text-center flex flex-col justify-start'>
                            <span className='text-lg text-gray-200 py-2'>Recovered Cases</span>
                            <span className='text-4xl text-[#0AA1DD]'>{formatNo(totalRecovered)}</span>
                          </div>
                        
                          <div className='px-4  py-2 bg-gray-900 text-white text-2xl rounded-lg mb-2 text-center flex flex-col justify-start'>
                            <span className='text-lg text-gray-200 py-2'>No of Deaths</span>
                            <span className='text-4xl text-red-500'>{formatNo(deaths)}</span>
                          </div>

                          <div className='px-4  py-2 bg-gray-900 text-white text-2xl rounded-lg mb-2 text-center flex flex-col justify-start'>
                            <span className='text-lg text-gray-200 py-2'>Fully Vaccinated</span>
                            <span className='text-4xl text-[#0AA1DD]'>4,670,707,904</span>
                          </div>
                      </div>
                        <Map />
                    </div>

                    <div className='border-2 border-red-200 flex mx-8 my-4'>
                      <div className='w-3/5 mr-2 border-8 rounded-md'>
                         {/* <LineChart  setDeaths={setDeaths} setTotalDeaths={setTotalDeaths}  setRecovered={setRecovered} setTotalRecovered={setTotalRecovered}/> */}
                         <Line />
                         {/* <div className='mb-4 w-full shadow-md rounded border-gray-400'>
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
                          </div> */}
                      </div>

                      <div className='border-4 border-green-500 w-2/5 rounded-md'>
                        <div className='flex justify-center items-center rounded-md'>
                          <Donut pieD={formatPerc(shareRecovered)} deaths={deaths} totalConf={confirmed} formatPerc={formatPerc}/>
                        </div>
                      </div>
                    </div>
                </div>
            </div>

            {/* <Cases deaths={deaths} confirmed={confirmed} recovered={recovered} formatNo={formatNo} /> */}
            {/* {console.log('d',deaths)} */}
            {/* <Donut pieD={pie} conf={conf} totalConf={totalConf}/> */}
            line
            {/* <Line /> */}
            {/* <BarGraph /><Line /> */}
    </div>
  )
}

export default Dash