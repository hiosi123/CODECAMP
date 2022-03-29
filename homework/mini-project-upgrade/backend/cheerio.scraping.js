import axios from 'axios'
import cheerio from 'cheerio'

export async function createBoardAPI(mydata) {
    //www.google.com
    //const targetURL = mydata.contents.split(' ').filter((el) => el.startsWith("http"))[0]
    console.log(mydata)

    let keyvalue = {}
    
    const favorite = await axios.get(mydata) 
    const $ = cheerio.load(favorite.data) //엑시오스로 가져온 객체 안에 데이터를 뽑아옴 aaa.data
    $("meta").each((_, el) => { //each 모든 메타태그에 대해서 각각 가져온다, _각각의 메타태그, el 요소
        if($(el).attr('property')){
            const key = $(el).attr('property').split(':')[1] //attr 속성을 찾는다, og:title를 찾는다, 'title'
            const value= $(el).attr('content') //naver 
            keyvalue[key] = value
            
        }
    
    
    }) 
    
    return keyvalue
}

