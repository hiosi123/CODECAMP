export function getToday () {// 여기서 오늘 날짜로 만들기!!
    let today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2,'0')
    const dd = String(today.getDate()).padStart(2,'0')
    const todayNum = `${yyyy}-${mm}-${dd}`
    return todayNum
}