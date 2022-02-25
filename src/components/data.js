// csv('time_series_covid19_confirmed_global.csv').then(data =>{
//   data.forEach(e => {
//     delete e['Province/State']
//     delete e['Lat']
//     delete e['Long']
//   })

//   // console.log(Object.values(data)[0])

//   data.forEach(e => {
//     for (let key in e){
//     if(key != 'Country/Region'){
//       e[key] = parseInt(e[key])
//     }
//     }
//   })
 

//   const results = data.reduce((acc, x) => {
//     let id = acc[x['Country/Region']]

//     if(id){
//       id['Country/Region'] = x['Country/Region']
//     } else{
//       acc[x['Country/Region']]= x
//     }
//     return acc;
//   }, [])

//   // console.log(Object.values(results[0]))


//   const popresult = []

//   for (let key in results) {
//     popresult.push(results[key])
//   }

// //  console.log(popresult[0])

// const keylist = []
// let i=0

// popresult.forEach(e => {
//   if(i == 0){
//     for (let k in e){
//         if(k !== "Country/Region"){
//           keylist.push(k)
//         }
//     }
//   }
//   i++
// })
// //  console.log(keylist)




// const finaldata = []
// const dataTime = []

// keylist.forEach(mykey => {
//   const parseDate = timeParse("%m/%d/%y");
//   const newresult = []

//   popresult.forEach(e => {
//       // temparray = []
//       for(let k in e){
//           let country = e['Country/Region']
//           if(k == mykey){
//               newresult.push({"country":country,value:e[k]})
//           }
//       } 
//   })
//   // console.log(Object.values(newresult)[2])

//   // Object.values(newresult)

//   const  data1 = newresult.sort((a, b) => (descending(a.value, b.value))).slice(0,10)
//       .sort((a, b) => ascending(a.value, b.value))

//   // console.log(Object.values(data1))
  
//   dataTime.push(parseDate(mykey))
//   finaldata.push({[parseDate(mykey)]:data1})

//   // console.log(dataTime.length)
//   // console.log(Object.values(finaldata[0]))

//   const dataObj =  Object.values(finaldata[0])
//   const myMax = max(dataObj[0], d=> d.value)
//   console.log(myMax)

  

// })
// // popresult.forEach(e => delete e['Country/Region'])



// })