let s = "try hello world"

s = s.split(' ')
s.length
let answer = '';
for(let i =0; i < s.length;i++) {
	
	for(let j=0; j < s[i].length; j++){
		if(j % 2) {
  		answer += s[i][j].toLowerCase()
		} else {
  		answer += s[i][j].toUpperCase()
		}
	}
  if (s[i] === ''){
		answer += ' '
	} else if(i !== ''){
		answer += ' '
	} 
  
}
answer = answer.slice(0,-1)
answer
