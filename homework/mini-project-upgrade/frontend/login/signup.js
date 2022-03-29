// 휴대폰 인증 토큰 전송하기


const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  const number = document.getElementById("PhoneNumber01").value + document.getElementById("PhoneNumber02").value + document.getElementById("PhoneNumber03").value
  
  const result = await axios.post("http://localhost:3001/tokens/phone", {
    phone: number
  })
  console.log('인증 번호 전송')
  // .then((res) =>{
  //   console.log(res)
  //   document.getElementById('TokenInput').innerText = res.data
  // })
}

const submitToken= async () => {
  const tokenFront = document.getElementById("TokenInput").value
  const number = document.getElementById("PhoneNumber01").value + document.getElementById("PhoneNumber02").value + document.getElementById("PhoneNumber03").value
  
  const sendToken = await axios.patch("http://localhost:3001/tokens/phone", {
    token: tokenFront,
    phone: number
  }).then((res) => {
    console.log(res)
  })

}

// 핸드폰 인증 완료 API 요청
const submitSignup = async () => {
  const name = document.getElementById("SignupName").value
  const personal = document.getElementById("SignupPersonal1").value
  const phoneNum = document.getElementById("PhoneNumber01").value + document.getElementById("PhoneNumber02").value + document.getElementById("PhoneNumber03").value
  const mySite = document.getElementById("SignupPrefer").value
  const password = document.getElementById("SignupPwd").value
  const email = document.getElementById("SignupEmail").value
  
 
  const result = await axios.post("http://localhost:3001/user", {
      name: name,
      email: email,
      personal: personal,
      prefer: mySite,
      pwd: password,
      phone: phoneNum
  }).then((res) =>{
    console.log(res)
    
  })
  console.log(result)
}