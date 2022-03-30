import {CashService} from './services/cash.service.js'



export class CouponController {
    constructor(cashService) {
        this.cashService = cashService
    }

    buyCoupon = (req,res) => {
        // 1. 가진돈 검증하는 코드
        // const cashService = new CashService()
        const hasMoney = this.cashService.checkValue() // true 또는 false 리턴
    
        // 2. 쿠폰을 구매하는 코드
        if(hasMoney) {
            res.send('쿠폰 구매 완료!!')
        }
    
    }

}   