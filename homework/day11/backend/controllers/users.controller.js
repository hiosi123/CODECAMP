import {User} from "../models/userSchema.model.js"

export class FindUser {
    
    
    bringUser = async(req, res) => {

    const user = await User.find()
    //회원 정보가 없을때 array 의 길이는 0입니다.
    if(user.length === 0){
        res.status(422)
        res.send("등록된 회원 정보가 없습니다.")
        return
    }
    res.send(user)
        
    }   

}