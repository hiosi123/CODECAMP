import axios from 'axios'
import {GetToday} from './utils.service.js'



export class EmailCheck extends GetToday{

    getTemplate

    constructor({name,personal, phone, prefer, pwd, email}) {
        super()
        this.name = name
        this.personal = personal
        this.phone = phone
        this.prefer = prefer
        this.pwd = pwd
        this.email = email
        this.today = this.today()
    
    }

    checkAtEmpty = () => {
        if (this.email.includes('@') === false || this.email === ''){
            console.log('이메일 형식이 올바르지 않습니다')
            return 
        } else {
            return true
        }
    }

    getTemplate = () => {
       
        return `
        <html>
            <body>
                <h1>${this.name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름: ${this.name}<div/>
                <div>주민등록번호: ${this.personal}<div/>
                <div>전화번호: ${this.phone} <div/>
                <div>좋아하는 사이트: ${this.prefer} <div/>
                <div>이메일: ${this.email}</div>
                <div>패스워드: ${this.pwd}</div>
                <div>오늘 날짜: ${this.today}<div/>
            <body/>
    
        </html>
        `
    }

    sendEmail = async () => {
        const appKey = process.env.EMAIL_APP_KEY
        const XSecretKey = process.env.EMAIL_X_SECRETE_KEY
        const sender = process.env.EMAIL_SENDER
        const result3 = await axios.post(`https://api-mail.cloud.toast.com/email/v2.0/appKeys/${appKey}/sender/mail`, {
            senderAddress : sender,
            title: "Hello World Welcome",
            body: this.getTemplate,
            receiverList: [
                {
                    receiveMailAddr: this.email,
                    receiveType: "MRT0"
                }
            ]
        }, {
            headers:{
                "Content-Type": "application/json;charset=UTF-8",
                "X-Secret-Key": XSecretKey
            }   
        })


        console.log('전송 끝!!!')

        }


}

// const run = { name: "신홍석",personal: "1111111-1111111", phone: "9192313123", prefer: "www.google.com", pwd: "9123123", email:"hiosi@naver.com"}

// const emailCheck = new EmailCheck(run);

// console.log(emailCheck.getTemplate())

