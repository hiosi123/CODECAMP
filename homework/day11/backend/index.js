import {checkValidationPhone,getToken,sendToken} from './phone.js'
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
import {UserControl} from './controllers/user.controller.js'
import {FindUser} from './controllers/users.controller.js'



dotenv.config() 

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));


const port = 3001

//회원가입 버튼
const userControl = new UserControl()
app.post('/user', userControl.checkUser)


const findUser = new FindUser()
app.get('/users', findUser.bringUser)



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