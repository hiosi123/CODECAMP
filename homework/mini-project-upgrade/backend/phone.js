import axios from 'axios'

//핸드폰 토큰 생성하는 API
export function checkValidationPhone(myphone) {
    if(myphone.length !==10 && myphone.length !==11){
        console.log('에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요');
        return false;
    } else {
        return true;
    }
}

export function getToken() {
    const i = 6;
    if (i === undefined) {
        console.log('에러 발생!!! 갯수를 제대로 입력해 주세요');
        return;
    } else if (i <= 0) {
        console.log('에러 발생 !! 갯수가 너무 적습니다!!!');
        return;
    } else if (i > 10) {
        console.log('에러 발생 !! 갯수가 너무 많습니다!!!');
        return;
    }
    const result = String(Math.floor(Math.random() * (10 ** i))).padStart(i,'0')
    return result;
}

export async function sendToken(myphone, result) {
    const appKey = process.env.SMS_APP_KEY
    const XSecretKey = process.env.SMS_X_SECRETE_KEY
    const sender = process.env.SMS_SENDER

    const result1 = await axios.post(`https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${appKey}/sender/sms`, {
        body: `안녕하세요, 인증번호는 ${result} 입니다.`,
        sendNo: sender,
        recipientList: [{internationalRecipientNo: myphone}]
    }, {
        headers:{
            "Content-Type": "application/json;charset=UTF-8",
            "X-Secret-Key": XSecretKey
        }   
    })
    console.log(result1)
    console.log("전송 끝!!!")
    //console.log(myphone + '번호로 인증번호' + result + ' 를 전송합니다!')
}

