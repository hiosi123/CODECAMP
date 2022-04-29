//우리가 라이브러리를 만들어서 제공해줄때
// 즉 함수를 제공해 줄때 많이 쓰인다.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

interface IProfile {
  name: string;
  age: 13;
  school: string;
  hobby?: string;
}
//합체가 된다 인터페이스는, 타입과 인터페이스의 차이다
interface IProfile {
  apple: string;
}

//선언병합
// const bbb: IProfile = {

// }

// 1. Partial 타입
//특정 객체의 모두가 필수가 아닌 조건으로 바꿔준다.
type Mytype1 = Partial<IProfile>;

// 2. Required 타입
// partial 타입의 반대, 전부다 필수 요소가 되어 버린다.
type Mytype2 = Required<IProfile>;

// 3. Pick 타입
// 아이프로필에서 name 과 age 만 골라줘
type Mytype3 = Pick<IProfile, "name" | "age">;

// 4. Omit 타입
// 아이프로필에서 school 만 빼고 나머지다
type Mytype4 = Omit<IProfile, "school">;

// 5. Record 타입
// 이런 특정 조건이 있다고 할때, 각각의 레코드에 아이프로필을 적용한다, 마우스 올리고 확인해라 !
type ZZZ = "aaa" | "qqq" | "rrr";
type Mytype6 = Record<ZZZ, IProfile>;
