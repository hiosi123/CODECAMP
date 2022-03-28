import puppeteer from "puppeteer"
import mongoose from "mongoose"
import { Stock } from "./models/stock.model.js"
//크롤링 위법사례 https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/
mongoose.connect("mongodb://localhost:27017/myDocument")

async function startCrawling(){
    const browser = await puppeteer.launch({ headless:false }) //브라우저가 안보이게 만듬 headless:true 로 하면 더 빠르게 실행이 됨
    const page = await browser.newPage() // 페이지를 연다
    await page.setViewport({ width: 1280, height: 720}) // 페이지의 사이즈 설정

    await page.goto("https://finance.naver.com/item/sise.naver?code=005930") //여기 페이지로 이동
    await page.waitForTimeout(1000)
    
    //body의 자식으로 테이블이 있지 않다
    const framePage = await page.frames().find(el => el.url().includes("/item/sise_day.naver?code=005930")) //이.프레임으로 이동
    //iframe 안은 새로운 새아티드, 새로운 html 사이트의 바디의 테이블에서 찾아와야한다

    for(let i=3; i<=7; i++){
        await page.waitForTimeout(500)
        const date = await framePage.$eval(
            `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
            (el) => el.textContent
        )
        const price = await framePage.$eval(
            `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
            (el) => el.textContent
        )

        console.log(`날짜: ${date}, 가격 ${price}`)

        const stock = new Stock({
            name: "삼성전자",
            date: date,
            price: Number(price.replaceAll(",",""))
        })
        await stock.save()
        
    }
    
    //뽑아 오고 싶은 정보를 찾아옴
    
    await browser.close()
}

startCrawling()

//robots.txt 로 들어가서 각 사이트의 크롤링 가이드를 볼 수 있음 

