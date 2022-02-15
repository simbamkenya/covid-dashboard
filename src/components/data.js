// import React from 'react'

// function data() {

//     csv('time_series_covid19_confirmed_global.csv').then(data =>{
//         data.forEach(e => {
//           delete e['Province/State']
//           delete e['Lat']
//           delete e['Long']
//         })
   
//         data.forEach(e => {
//           for (let key in e){
//            if(key != 'Country/Region'){
//              e[key] = parseInt(e[key])
//            }
//           }
//         })
   
//        //  console.log(Object.values(data)[0])
//         const results = data.reduce((acc, x) => {
//            let id = acc[x['Country/Region']]
   
//            if(id){
//              id['Country/Region'] = x['Country/Region']
//            } else{
//              acc[x['Country/Region']]= x
//            }
//            return acc;
//         }, [])
   
   
//         const popresult = []
   
//         for (let key in results) {
//           popresult.push(results[key])
//         }
   
//        //  console.log(popresult[0])
   
//        const keylist = []
//        let i=0
   
//        popresult.forEach(e => {
//          if(i == 0){
//            for (let k in e){
//                if(k !== "Country/Region"){
//                  keylist.push(k)
//                }
//            }
//          }
//          i++
//        })
   
//        const finaldata = []
//        const dataTime = []
   
//        keylist.forEach(mykey => {
//          const parseDate = timeParse("%m/%d/%y");
//          const newresult = []
   
//          popresult.forEach(e => {
//              // temparray = []
//              for(let k in e){
//                  let country = e['Country/Region']
//                  if(k == mykey){
//                      newresult.push({"country":country,value:e[k]})
//                  }
//              } 
//          })
   
//          let data1 = newresult.sort(function (a, b) {
//            return descending(a.value, b.value);
//            })
//          let  data1 = data1.slice(0,10);
//            let data1 = data1.sort(function (a, b) {
//            return ascending(a.value, b.value);
//            })
//            // console.log("data",data);
//            dataTime.push(parseDate(mykey))
//            finaldata.push({[parseDate(mykey)]:data1})
         
//        })
   
       
//        // console.log(newresult[0])
   
//        // popresult.forEach(item => console.log(item))
//        console.log(data1)
   
//        //  const countries = Object.keys(results)
   
//        //  countries.forEach(item => {
//        //    console.log(results[item['Country/Region']])
//        //   // for (let key in item){
//        //   //   console.log(item[key])
//        //   // }
//        //   //  return { date: parseDate(), value: item[] }
//        //  })
//        //  console.log(results)
//        // console.log(data)
//      })
//   return (
//     <div></div>
//   )
// }

// export default data