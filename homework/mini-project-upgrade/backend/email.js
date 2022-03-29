import axios from 'axios'
import {getToday} from './utils.js'

export function checkAtEmpty(email) {
    if (email.includes('@') === false || email === ''){
        console.log('이메일 형식이 올바르지 않습니다')
        return 
    } else {
        return true
    }
}

export function getTemplate({name,personal, phone, prefer, pwd, email}) {
    return `
    <html>
        <body>
            <h1>${name}님 가입을 환영합니다!!!</h1>
            <hr />
            <div>이름: ${name}<div/>
            <div>주민등록번호: ${personal}<div/>
            <div>전화번호: ${phone} <div/>
            <div>좋아하는 사이트: ${prefer} <div/>
            <div>이메일: ${email}</div>
            <div>패스워드: ${pwd}</div>
            <div>오늘 날짜: ${getToday()}<div/>
        <body/>

    </html>
    `
}

export async function sendEmail(email,template) {
    const appKey = process.env.EMAIL_APP_KEY
    const XSecretKey = process.env.EMAIL_X_SECRETE_KEY
    const sender = process.env.EMAIL_SENDER
    const result3 = await axios.post(`https://api-mail.cloud.toast.com/email/v2.0/appKeys/${appKey}/sender/mail`, {
        senderAddress : sender,
        title: "Hello World Welcome",
        body: template,
        receiverList: [
            {
                receiveMailAddr: email,
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


    //console.log(`${email} 로 ${template} 을 보냅니다`)
}


