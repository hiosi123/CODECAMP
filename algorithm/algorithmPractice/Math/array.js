//배열 (연습문제)

//3
//let fruits = ['사과','바나나', '파인애플']

//4
// let newFruits = fruits[fruits.length-1]
// console.log(newFruits);

//5
let students = ["철수", "영희", "훈이", "짱구", "유리"]
newArr = students.slice(0,3);
console.log(newArr)

// 6
let fruits = ["사과", "바나나"]
fruits.forEach((a,i) => {
    fruits[i] = '맛있는 ' + a
})
console.log(fruits);

//7
const number = "01012345678"
array = []
array.push(number.slice(0,3));
array.push(number.slice(3,7));
array.push(number.slice(7));
console.log(array);


