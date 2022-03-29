//8
// let student = {}
// student.name = '철수'
// console.log(student);

//9
// const student = {
// 	name: "철수",
// 	age: 8,
// };

// const school = {
// 	name: "다람쥐초등학교",
// 	teacher: "다람이",
// }

// student.school = school

// console.log(student);

//10
// let student = {
// 	name: "철수",
// 	drink: "사이다"
// };

// delete student.drink;
//console.log(student);


//11
const classmates = [
	{
		name: "철수",
		age: 8,
		school: "다람쥐초등학교"
	},
	{
		name: "영희",
		age: 8,
		school: "토끼초등학교"
	},
	{
		name: "짱구",
		age: 8,
		school: "다람쥐초등학교"
	}
];

classmates[1].school = '다람쥐초등학교'
console.log(classmates);