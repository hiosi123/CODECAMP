import { CreateBoardAPI } from './services/cheerio.service.js'
import {EmailCheck} from './services/emailCheck.service.js'
import {Personal} from "./services/personal.service.js"
import {Phone} from "../models/phone.model.js"
import {Starbucks} from "../models/starbucks.model.js"
import {User} from "../models/userSchema.model.js"



export class UserControl{ 
   

    checkUser = async(req, res) => {
    
    const NumberFromFront = req.body.phone
    const PersonalFromFront = req.body.personal
    const EmailFromFront = req.body.email
    let SiteFromFront = req.body.prefer

    const phonenum = await Phone.findOne({ phone: NumberFromFront });
    let user = await User.findOne({phone:NumberFromFront})
    
    //클라이언트가 입력한 번호가 인증 확인 과정에서 들어온 번호가 있는지
    if(!phonenum){
        res.status(422)
        res.send("핸드폰 인증 과정을 먼저 진행해 주세요")
        return
    }

    //클라이언트가 입력한 번호가 이미 유저로 등록 되어 있는지 여부 확인
    if(user){
        res.status(422)
        res.send("이미 존재하는 유저입니다")
        return
    }
    //핸드폰 번호가 인증되어 있는지
    if(phonenum.phone !== NumberFromFront || phonenum.isAuth === false) {
        res.status(422)
        res.send("에러!! 핸드폰 번호가 인증되지 않았습니다.")
        return
    }

    //좋아하는 사이트 주소가 올바른지
    if(SiteFromFront.startsWith("www")) {
        SiteFromFront = "https://" + SiteFromFront + "/"
    } else {
        res.status(422)
        res.send("예시: www.google.com 형태로 적어주세요")
        console.log("예시: www.google.com 형태로 적어주세요")
        return 
    }

    const createBoardAPI = new CreateBoardAPI(SiteFromFront)
    req.body.og = createBoardAPI.scrapping()
    
    //주민번호 형식이 올바른지
    const personal = new Personal(PersonalFromFront)
    if(!personal.checkDash() || !personal.checkLength()){
        res.send('주민번호 형식을 확인해주세요')
        res.status(422)
        return
    }
    const personalHide = personal.hideNumber()
    req.body.personal = personalHide
    
    const emailCheck = new EmailCheck(req.body)
    if(emailCheck.checkAtEmpty()){  //1. 이메일이 정상인지 확인(1- 존재여부, 2- 골뱅이가 포함되어 있어야 한다)
        emailCheck.getTemplate()  //2. 가입환영 템플릿 만들기
        await emailCheck.sendEmail()  //3. 이메일에 가입환영 템플릿 전송하기
    } else {
        res.send('이메일 형식이 올바르지 않습니다')
        return
    }
    // 위에 조건들을 만족하면 저장
    const Senduser = new User({
        ...req.body
    })
    await Senduser.save()

    //아이디 반환
    const id = await User.findOne({phone:NumberFromFront})
    res.send(id._id)
}

}