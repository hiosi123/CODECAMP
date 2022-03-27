import {checkValidationPhone,getToken,sendToken} from './phone.js'
import {checkAtEmpty, sendEmail,getTemplate} from './email.js'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import {options} from "./swagger/config.js"
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Phone } from './models/phone.model.js';
import {Starbucks} from "./models/starbucks.model.js"
import { User } from './models/userSchema.model.js'
import { createBoardAPI } from './cheerio.scraping.js'
import {checkDash, checkLength, hideNumber} from "./checking.js"



dotenv.config() 

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));


const port = 3001

//회원가입 버튼
app.post('/user', async(req, res) => {
    
    const NumberFromFront = req.body.phone
    const PersonalFromFront = req.body.personal
    const EmailFromFront = req.body.email
    let SiteFromFront = req.body.prefer

    
    const phonenum = await Phone.findOne({ phone: NumberFromFront });
    const user = await User.findOne({phone:NumberFromFront})
    
    //클라이언트가 입력한 번호가 인증 확인 과정에서 들어온 데이터 서버에 있는 번호와 일치하는지
    if(phonenum) {
        //클라이언트가 입력한 번호가 이미 유저로 등록 되어 있는지 여부 확인
        if(user){
            res.status(422)
            res.send("이미 존재하는 유저입니다")
            return
        }

        if(phonenum.phone === NumberFromFront && phonenum.isAuth=== true){

            //좋아하는 사이트 주소가 올바른지
            if(SiteFromFront.startsWith("www")) {
                SiteFromFront = "https://" + SiteFromFront + "/"
            
            } else {
                res.status(422)
                res.send("예시: www.google.com 형태로 적어주세요")
                console.log("예시: www.google.com 형태로 적어주세요")
                return 
            }
            const website = await createBoardAPI(SiteFromFront)
            req.body.og = website
            
            //주민번호 형식이 올바른지
            if(!checkDash(PersonalFromFront) || !checkLength(PersonalFromFront)){
                res.send('주민번호 형식을 확인해주세요')
                res.status(422)
                return
            }
            const personalHide = hideNumber(PersonalFromFront)
            req.body.personal = personalHide
            
            
             //1. 이메일이 정상인지 확인(1- 존재여부, 2- 골뱅이가 포함되어 있어야 한다)
            if (checkAtEmpty(EmailFromFront)) {
          
              //2. 가입환영 템플릿 만들기
              const template = getTemplate(req.body)
          
              //3. 이메일에 가입환영 템플릿 전송하기
              await sendEmail(EmailFromFront, template)
 
            } else {
                res.send('이메일 형식이 올바르지 않습니다')
            
                return
            }

            const user = new User({
                ...req.body
            })
            
            await user.save()

            const id = await User.findOne({phone:NumberFromFront})

            
            
            res.send(id._id)
            
            return

        } else{
            res.status(422)
            res.send("에러!! 핸드폰 번호가 인증되지 않았습니다.")
            return
        }

    } else {
        res.status(422)
        res.send("핸드폰 인증 과정을 먼저 진행해 주세요")
        return
    }
})

app.get('/users', async(req, res) => {

    const user = await User.find()
    //회원 정보가 없을때 array 의 길이는 0입니다.
    if(user.length === 0){
        res.send("등록된 회원 정보가 없습니다.")
        return
    }
    res.send(user)
    

    
})

app.get('/starbucks', async (req,res) => {
    const coffeesServer = await Starbucks.find()
    // const coffee = await Starbucks.find()

    res.send(coffeesServer)
})

app.post('/tokens/phone', async (req, res) => {
    // 1.핸드폰 번호를 제대로 입력했나?
    //핸드폰 번호를 밖으로 담아주기
    const user = await User.findOne({phone:req.body.phone})

    if(user){
        res.status(422)
        res.send("이미 존재하는 유저입니다")
        return
    }

    const isValid = checkValidationPhone(req.body.phone)
    let myToken
    if(isValid) {
        // 2. 핸드폰 토큰 6자리 만들기
        myToken = getToken()
        
        sendToken(req.body.phone, myToken)
        
       
    }

    const phonenum = await Phone.findOne({ phone:req.body.phone });
    if(phonenum === null) {

        const phoneToken = new Phone({
            token: myToken,
            phone: req.body.phone,
            isAuth: false
        })
        await phoneToken.save()
        res.send(myToken)
        
    } else {
        await Phone.updateOne({phone:req.body.phone}, {token:myToken})
        res.send(`updated token: ${myToken}`)
    }
})

app.patch('/tokens/phone', async (req, res) => {
    
    const phonenum = await Phone.findOne({ phone:req.body.phone });
    if(phonenum === null){
        res.status(422)
        res.send("post/tokens/phone 를 먼저 실행해 주세요")
        return
    }

    if(req.body.phone !== phonenum.phone || req.body.token !== phonenum.token) {
        res.status(422)
        res.send(false)
        console.log("인증 실패")
        return
    } else {
        await Phone.updateOne({phone:req.body.phone }, {isAuth:true})
        res.send(true)
        console.log("인증 성공")
    }
        
})



mongoose.connect("mongodb://my-database:27017/myDocument")

app.listen(port)