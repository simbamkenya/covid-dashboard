import React from 'react'
import BarGraph from './BarGraph'
import Sidebar from './Sidebar'
import { format } from 'd3'

function Cases({ deaths, confirmed, recovered }) {
    // console.log(recovered)
    const formatNo = format(",")
    const formatPerc = format(".0%")
  return (
    <div className='bg-slate-600 min-h-screen flex'>
       <Sidebar />

       <div className='m-8 mt-2 rounded-md border-8 bg-gray-400 flex-grow'>
        <div className='py-8 my-2'>
         <span className='text-lg capitalize text-white font-bold'>Death cases over time</span>
         <BarGraph data={deaths}/>
        </div>
        <div className='flex border-green-200 justify-center'>
           <div className=''>
               <div className='border-red-4 rounded-md bg-black mr-2'>
                   <table className='text-white table-auto mt-2'>
                    <thead className='bg-gray-500 rounded-sm'>
                        <tr>
                        <th className='p-2 text-left font-bold'>Country</th>
                        <th className='p-2 text-left font-bold'>No of Cases</th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-300'>
                        deaths
                        {deaths.map((e, i) => (
                            <tr key={e.country}>
                            <td>{`${++i}.`} {e.country}</td>
                            <td>{formatNo(e.deaths)}</td>
                        </tr>
                        ))}
                    </tbody>
                </table> 
               </div>
               
           </div>

                {/* <table className='text-white table-auto w-full mt-2 '>
                <thead className='bg-gray-500 rounded-sm'>
                <tr>
                    <th className='p-2 text-left font-bold'>Country</th>
                    <th className='p-2 text-left font-bold'>No of Cases</th>
                </tr>
                </thead>

                <tbody className='divide-y divide-gray-300 '>
                {recovered.map((e, i) => (
                    <tr key={e.country}>
                    <td>{`${++i}.`} {e.country}</td>
                    <td>{formatNo(e.recovered)}</td>
                </tr>
                ))}
                </tbody>
            </table> */}
            <div>
               <div className='border-red-4 rounded-md bg-black mr-2'>
                <table className='text-white table-auto mt-2'>
                        <thead className='bg-gray-500 rounded-sm'>
                            <tr>
                            <th className='p-2 text-left font-bold'>Country</th>
                            <th className='p-2 text-left font-bold'>No of Cases</th>
                            </tr>
                        </thead>

                        <tbody className='divide-y divide-gray-300'>
                            deaths
                            {deaths.map((e, i) => (
                                <tr key={e.country}>
                                <td>{`${++i}.`} {e.country}</td>
                                <td>{formatNo(e.deaths)}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
               </div> 
            </div>
           
            <div>
                 <div className='border-red-4 rounded-md bg-black'>
                    <table className='text-white table-auto mt-2'>
                        <thead className='bg-gray-500 rounded-sm'>
                            <tr>
                            <th className='p-2 text-left font-bold'>Country</th>
                            <th className='p-2 text-left font-bold'>No of Cases</th>
                            </tr>
                        </thead>

                        <tbody className='divide-y divide-gray-300'>
                            deaths
                            {recovered.map((e, i) => (
                                <tr key={e.country}>
                                <td>{`${++i}.`} {e.country}</td>
                                <td>{formatNo(e.confirmed)}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                 </div> 
           </div>
        </div>

         


       </div>


        {/* <table className='text-white table-auto w-full mt-2 '>
            <thead className='bg-gray-500 rounded-sm'>
            <tr>
                <th className='p-2 text-left font-bold'>Country</th>
                <th className='p-2 text-left font-bold'>No of Cases</th>
            </tr>
            </thead>

            <tbody className='divide-y divide-gray-300 '>
            {recovered.map((e, i) => (
                <tr key={e.country}>
                <td>{`${++i}.`} {e.country}</td>
                <td>{formatNo(e.recovered)}</td>
            </tr>
            ))}
            </tbody>
        </table>
        <table className='text-white table-auto mt-2'>
            <thead className='bg-gray-500 rounded-sm'>
                <tr>
                <th className='p-2 text-left font-bold'>Country</th>
                <th className='p-2 text-left font-bold'>No of Cases</th>
                </tr>
            </thead>

            <tbody className='divide-y divide-gray-300'>
                deaths
                {deaths.map((e, i) => (
                    <tr key={e.country}>
                    <td>{`${++i}.`} {e.country}</td>
                    <td>{formatNo(e.deaths)}</td>
                </tr>
                ))}
            </tbody>
        </table> */}
        

       
    </div>
  )
}

export default Cases