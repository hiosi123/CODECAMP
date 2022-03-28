import puppeteer from "puppeteer"
import mongoose from "mongoose"
import {OliveYoung} from "./models/OliveYoung.model.js"

//크롤링 위법사례 https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/

// mongoose.connect("mongodb://localhost:27018/myDocument")

async function startCrawling(){
    const browser = await puppeteer.launch({ headless:false }) //브라우저가 안보이게 만듬 headless:true 로 하면 더 빠르게 실행이 됨
    const page = await browser.newPage() // 페이지를 연다
    await page.setViewport({ width: 1280, height: 720}) // 페이지의 사이즈 설정
    await page.goto("https://www.oliveyoung.co.kr/store//mypage/getReviewerLounge.do") //여기 페이지로 이동
    
    const [popup] = await Promise.all([
        new Promise(resolve => page.once('popup', resolve)),
        page.click('a[onclick=#topReviewerList > li:nth-child(2) > div.user.clrfix > a]'),
      ]);
    
    const insta = await page.$eval(
        `#topReviewerList > li:nth-child(2) > div.user.clrfix > a`,
        (el) => el.onclick
    )
    console.log(insta)
    await page.waitForTimeout(1000)



    // console.log(img)
    // console.log(name)
    // const starbucks = new OliveYoung({
    //     name: name,
    //     img: img
    // })
    // await starbucks.save()
    await browser.close()
}

   


startCrawling()