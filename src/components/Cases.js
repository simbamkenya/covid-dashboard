import React from 'react'
import BarGraph from './BarGraph'
import Sidebar from './Sidebar'
import { format } from 'd3'

function Cases({ deaths }) {
    // console.log(recovered)
    const formatNo = format(",")
    const formatPerc = format(".0%")
  return (
    <div className='bg-slate-600 min-h-screen'>
       <Sidebar />

       <div>
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
            </table> */
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
        

        {/* <BarGraph data={deaths}/> */}
    </div>
  )
}

export default Cases