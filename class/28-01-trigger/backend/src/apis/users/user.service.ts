import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ email }) {
    return this.userRepository.findOne({ email });
  }

  async create({ email, hashedPassword: password, name, age }) {
    // hasedPassword: password 를 사용하면 hasedPassword 는 사라짐
    const user = await this.userRepository.findOne({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다');
    return await this.userRepository.save({
      email,
      password,
      name,
      age,
    });
  }
}
