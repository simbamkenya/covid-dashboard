import React from 'react';
import Map from './Map'


function Dash() {
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
          </div>

          <ul className='mt-3 text-white'>

          </ul>
          <div>
            
          </div>
        </div>
        {/* main */}
        <div className='flex-grow flex flex-col'>
            <Map />
        </div>
      </div>
    </div>
  );
}

export default Dash;