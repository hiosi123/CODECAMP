import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';

import { User } from './dto/entities/user.entity';
import { UpdateUserInput } from './dto/updateUser.input';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Query(() => [User])
  fetchUsers() {
    return this.userService.findAll();
  }
  @Query(() => [User])
  fetchUser(@Args('id') userId: string) {
    return this.userService.findOne({ userId });
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create({ createUserInput });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') userId: string, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.update({ userId, updateUserInput });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id') userId: string) {
    return this.userService.delete({ userId });
  }
}
