import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './dto/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne({ userId }) {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async create({ createUserInput }) {
    const user = await this.userRepository.findOne({
      email: createUserInput.email,
    });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다');
    return await this.userRepository.save(createUserInput);
  }

  async update({ userId, updateUserInput }) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const newUser = {
      ...user,
      ...updateUserInput,
    };
    return await this.userRepository.save(newUser);
  }

  async delete({ userId }) {
    const result = await this.userRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }
}
