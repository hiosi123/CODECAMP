import express from "express"

const app = express()

// 상품 구매하기 
app.post("/products/buy", (req,res) => {
    // 1. 가진돈 검증하는 코드 (대략 10줄)
    //
    //
    //

    // 2. 판매 여부 검증하는 코드 (대략 10줄)
    //
    //
    //

    // 3. 상품 구매하는 코드
    // if(돈 있음 && 판매중) {
        res.send("상품 구매 완료!!")
    //}
   
})

// 상품 환불하기 
app.post("/products/refund", (req,res) => {
    // 1. 판매여부를 검증하는 코드 (대략 10줄 정도)
    // ...
    // ...
    // ...

    // 2. 상품을 환불하는 코드
    //if(!판매중) {
        res.send("상품 환불 완료!!")
    //}

    
})


app.listen(3000)