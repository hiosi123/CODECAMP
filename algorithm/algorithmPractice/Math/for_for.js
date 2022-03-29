let numbers = [0,1,2,3,0]
let result = []
numbers = numbers
for(let i = 0; i< numbers.length; i++){
  for(let j = 0; j< numbers.length; j++){
  	i !== j ? result.push(numbers[i]+numbers[j]) : false
  }
}
result = [...new Set(result)].sort((a,b) => a-b)
// arr = numbers.reduce((a,b) => {
//   result.push(a+b) 
//   return b
// })

result