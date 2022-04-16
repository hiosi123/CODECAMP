import puppeteer from "puppeteer";
import mongoose from "mongoose";
import { OliveYoung } from "./models/OliveYoung.model.js";

//크롤링 위법사례 https://biz.chosun.com/topics/law_firm/2021/09/29/OOBWHWT5ZBF7DESIRKNPYIODLA/

// mongoose.connect("mongodb://localhost:27018/myDocument")

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false }); //브라우저가 안보이게 만듬 headless:true 로 하면 더 빠르게 실행이 됨
  const page = await browser.newPage(); // 페이지를 연다
  await page.setViewport({ width: 1280, height: 720 }); // 페이지의 사이즈 설정
  await page.goto(
    "https://www.oliveyoung.co.kr/store//mypage/getReviewerLounge.do"
  ); //여기 페이지로 이동
  await page.waitForTimeout(1000);

  const clicked = await page.click(
    `#topReviewerList > li:nth-child(2) > div.txt`
  );
  console.log(clicked);

  const reviewtext = await page.$eval(
    `#layerWrap920 > div > div > div.reviewer-profile-content > div > div > div.review-detail-view__content.scrbar > p.rw-box__description`,
    (el) => el.textContent
  );
  console.log(reviewtext);

  // console.log(reviewtext);

  // let rating = await page.$eval(
  //   `#layerWrap920 > div > div > div.reviewer-profile-content > div > div > div.review-detail-view__content.scrbar > div.rw-box__first-line > span.review_point > span`,
  //   (el) => el.textContent
  // );

  // console.log(data);
  // console.log(rating);

  // let evalData = await data.evaluate(
  //   "#layerWrap920 > div > div > div.reviewer-profile-content > div > div > div.review-detail-view__content.scrbar > div.rw-box__first-line > span.review_point > span",
  //   (el) => el.textContent
  // );
  // console.log(evalData);

  // await browser.close();
}
startCrawling();

// const rating = await clickPage.$eval(
//   `#layerWrap920 > div > div > div.reviewer-profile-content > div > div > div.review-detail-view__content.scrbar > div.rw-box__first-line > span.review_point > span`,
//   (el) => el.textContent
// );

// console.log(rating);

// console.log(img)
// console.log(name)
// const starbucks = new OliveYoung({
//     name: name,
//     img: img
// })
// await starbucks.save()
