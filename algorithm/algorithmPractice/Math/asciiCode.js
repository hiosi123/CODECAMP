let list = ["cODECAMP", "iS", "tHIS", "eVERYONE", "hELLO"]

let result = ''
list.reverse().forEach((a,i) => {
	for(let x of a){
    let num = x.charCodeAt()
    if(num >= 97 && num <=122) {
      result += String.fromCharCode(num - 32)
    } else {
      result += String.fromCharCode(num +32)
    }
  }
  if(i< list.length-1){
    result += ' '
  }
})

console.log(result)