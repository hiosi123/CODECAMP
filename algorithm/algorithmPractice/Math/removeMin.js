arr =[1,2,3,4,5,-1]
let answer = arr.sort((a,b) => b-a)
let filtered = arr.filter((e) => e !== Math.min(...answer))
filtered
// answer
// answer[4] === Math.min(...answer)
// for(let i; i< arr.length; i++) {
//   if(answer[i] === Math.min(...answer)){
//     answer.splice(i,1);
//     i--
//   }
// }

// answer
