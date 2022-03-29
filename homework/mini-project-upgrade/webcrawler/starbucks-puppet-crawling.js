import puppeteer from "puppeteer"
import mongoose from "mongoose"
import {Starbucks} from "./models/starbucks.model.js"
//크롤링 위법사례 https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/

mongoose.connect("mongodb://localhost:27017/myDocument")

async function startCrawling(){
    const browser = await puppeteer.launch({ headless:false }) //브라우저가 안보이게 만듬 headless:true 로 하면 더 빠르게 실행이 됨
    const page = await browser.newPage() // 페이지를 연다
    await page.setViewport({ width: 1280, height: 720}) // 페이지의 사이즈 설정
    await page.goto("https://www.starbucks.co.kr/menu/drink_list.do") //여기 페이지로 이동
    await page.waitForTimeout(1000)

    //뽑아 오고 싶은 정보를 찾아옴
    for(let i=1; i<12;i++){
    const img = await page.$eval(
        `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(${i}) > dl > dt > a > img`, 
        (el) => el.src
    )
    await page.waitForTimeout(1000)

    const name = await page.$eval(
        `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(${i}) > dl > dd`,
        (el) => el.textContent
    )
    console.log(img)
    console.log(name)
    const starbucks = new Starbucks({
        name: name,
        img: img
    })
    await starbucks.save()
    }

    await browser.close()
}

startCrawling()