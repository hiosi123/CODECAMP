class SkyUnit{ 

    constructor() {

    }

    run = () => {
        console.log("날라서 도망가자!!!")
    }
}

class GroundUnit {

    constructor(qqq) {
        
    }

    run = () => {
        console.log("뛰어서 도망가자!!!")
    }
}

class Monster extends GroundUnit {

    constructor(aaa) {
        super(300)
    }

    attack = () => {
        console.log('공격하자!!!')
        console.log("내 공격력은" + this.power + "이야!!")
    }

}

const mymonster1 = new Monster()
mymonster1.attack()
mymonster1.run()

