let aaa = "안녕하세요."; //처음 들어온 값을 타입으로 인식한다 = 타입 추론
aaa = 3;

// 타입명시
let bbb: string = "반갑습니다.";
bbb = 10;

// 문자타입
let ccc: string;
ccc = "반가워요";
ccc = 3;

// 숫자타입

let ddd: number;
ddd = "문자가 안들어감";

// boolean
let eee: boolean = true;
eee = true;

// 배열타입

let fff: number[] = [1, 2, 3, 4, 5, "안녕하세요"];
let ggg: string[] = ["철수", "영희", "훈이", 123];
let hhh: (number | string)[] = ["asdasd", 123];

//객체타입
interface IProfile {
  name: string;
  age: number | string;
  school: string;
  hobby?: string;
  banana?: string;
}

let profile: IProfile = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교",
};

profile.age = "8살";
profile.school = 123;

profile.banana = "좋아함";

console.log(profile);

// 함수 타입

const add = (money1: number, money2: number, unit: string): string => {
  return money1 + money2 + unit;
};

add(1000, 2000, "won");
