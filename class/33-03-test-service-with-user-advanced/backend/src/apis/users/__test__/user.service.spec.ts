import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

class MockUserRepository {
  mydb = [
    { email: 'tls1641@gmail.com', password: '0000', name: '신홍석', age: 8 },
    { email: 'tls1641@naver.com', password: '1234', name: '최성환', age: 12 },
    { email: 'hiosi@naver.com', password: '4321', name: '고재형', age: 100 },
  ];

  findOne({ email }) {
    const users = this.mydb.filter((el) => el.email === email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

// const IProfile = {
//   name: '철수',
//   age: 13,
// };
// const qqq: keyof IProfile;
// const qqq: 'name' | 'age';
//keyof -> 는 키만 빼온다 유저의
//record -> 기록한다 각각의 키에 타입들을
//그리고 Partial 목은 가짜이기 때문에 몇가지 테스트 api 기능들만 할꺼기 때문에 partial
//확인?
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>; //어떻게 새로운 타입
//그럼 이부분은 어떻게 만들어 졌나?
//원래는 유저 서비스에서의 레파지토리 였는데 이제는 목레파지토리로 바뀌었다
//

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    userService = userModule.get<UserService>(UserService);
    userRepository = userModule.get<MockRepository<User>>(
      getRepositoryToken(User),
    ); //userRepository 새로 만들어 온다 Level Up
  });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne'); //몇번 접근햇는지 알려줘 Level Up
      const userRepositorySpySave = jest.spyOn(userRepository, 'save'); // Level Up

      const myData = {
        email: 'tls1641@gmail.com',
        hashedPassword: '0000',
        name: '신홍석',
        age: 14,
      };
      try {
        await userService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }

      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(0);
    });

    it('회원 등록이 잘 했는지 검증!!', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne'); //몇번 접근햇는지 알려줘 Level Up
      const userRepositorySpySave = jest.spyOn(userRepository, 'save'); // Level Up

      const myData = {
        email: 'tls1642@gmail.com',
        hashedPassword: '0000',
        name: '신홍석',
        age: 14,
      };
      const myResultData = {
        email: 'tls1642@gmail.com',
        password: '0000',
        name: '신홍석',
        age: 14,
      };

      const result = await userService.create({ ...myData });
      expect(result).toStrictEqual(myResultData); //객체나 배열같은 경우는 비교해줄때 toStrictEqul을 써야한다

      expect(userRepositorySpyFindOne).toBeCalledTimes(1); //Level Up
      expect(userRepositorySpySave).toBeCalledTimes(1); //Level Up
    });
  });
});
