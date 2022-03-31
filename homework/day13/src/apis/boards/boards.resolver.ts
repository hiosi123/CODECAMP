import { BoardService } from './boards.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/createBoard.input';
// @  데코레이터

// :  typescript
@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board])
  fetchStarbucks() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  createStarbucks(
    @Args('drinks') drinks: string,
    @Args('cost') cost: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    console.log(drinks);
    console.log(cost);
    console.log(createBoardInput);
    return this.boardService.create();
  }
}
