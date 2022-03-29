let map = new Map([['A',1],['B',2],['C',3]])
map


map.size

map.set('d',3)

map.get('d')

map.has('d')


// let str = "ABCCCAA"
// let map = new Map([['A',1],['B',2],['C',3]]);
// str.split('').filter((e)=>{
//   if(map.has(e)){
//     map.set(e,map.get(e) +1)
//   }
// })

// map

// let vote = 'BACBACCACCBDEDE'

// let mapVote = new Map([['A', 0],['B', 0],['C', 0],['D', 0],['E', 0]]);


// vote.split('').filter((e) => {
//   if(mapVote.has(e)){
//     mapVote.set(e, mapVote.get(e) + 1)
//   }
// })

// let answer = [...mapVote].reduce((a,b)=> a[1] < b[1] ? b: a)[0]
// answer
