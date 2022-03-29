
class MyCar{
    type = "Benz"
    horspower = 500
    color = "green"

    go = () => {
        console.log( this.color + this.type + "자동차가" + this.horsepower + "마력으로")
        console.log("출발하기")
    }

    stop = () => {

        console.log( this.color + this.type + "자동차가" + this.horsepower + "마력으로")
        console.log("정지하기")
    }
}