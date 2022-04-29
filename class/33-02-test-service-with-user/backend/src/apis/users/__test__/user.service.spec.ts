import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

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

describe('UserService', () => {
  let userService: UserService;
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
  });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기', async () => {
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
    });

    it('회원 등록이 잘 했는지 검증!!', async () => {
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
    });
  });

  describe('findOne', () => {});
});
