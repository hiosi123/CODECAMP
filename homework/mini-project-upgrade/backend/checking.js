export function checkDash(number) {
    if(number.includes('-') === false) {
        console.log('에러발생!!! 형식이 올바르지 않습니다!!!');
        return false
    } else {
        return true
    }
}

export function checkLength(number){
    const breakNumber = number.split('-')
    if(breakNumber[0].length !== 6 || breakNumber[1].length !== 7) {
        console.log('에러발생!!! 갯수를 제대로 입력해주세요!!!');
        return false
    } else {
        return true
    }
}

export function hideNumber(number) {
    let count=6
    let arr = number.split('');
    arr.splice(arr.length-count, arr.length-1, ('*').repeat(count));
    let answer = arr.join('');
    return(answer)
    
}