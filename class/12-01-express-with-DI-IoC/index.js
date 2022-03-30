import express from "express"
import {ProductController} from './mvc/controllers/product.controller.js'
import { CouponController } from './mvc/controllers/coupon.controller.js'
import { ProductService } from "./mvc/controllers/services/product.service.js"
import { CashService } from "./mvc/controllers/services/cash.service.js"
import { PointService } from "./mvc/controllers/services/point.service.js"
const app = express()

const productService = new ProductService() //singleturn
const cashService = new CashService() // 뉴 한번으로 모든 곳에서 재사용 가능(싱글톤 패턴)
const pointService = new PointService()


// nest js 가 해준다 IOC (Inversion of controll)
//상품 api
const productController = new ProductController(cashService,productService) //의존성 주입, DI (dependency Injection)
app.post("/products/buy", productController.buyProduct) // 상품 구매하기 

app.post("/products/refund", productController.refundProduct) // 상품 환불하기 


//쿠폰 api
const couponController = new CouponController(pointService)
app.post("/coupons/buy",couponController.buyCoupon)// 쿠폰(상품권) 구매하기


app.listen(3000)