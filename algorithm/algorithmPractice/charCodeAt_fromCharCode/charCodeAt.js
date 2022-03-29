
s = "e F z"
n = 1

// [ 'a', ' ', 'B', ' ', 'z' ]
charCodeList = s.split('').map(e=> e.charCodeAt())
// a = 97, z = 122
// A = 65, Z = 90

final = charCodeList.map(e=> {
  if(e === 32){
    return e =' '
  } 

  if(e >= 97 && e <= 122){
    e += n
    if(e > 122){
      e -= 26
		} 
    e = String.fromCharCode(e)
    return e
  }
  
  if(e >=65 && e <= 90){
    e += n
    if(e > 90){
   		e -= 26
  	}
  	e = String.fromCharCode(e)
  return e
  }
})

answer = final.join('')