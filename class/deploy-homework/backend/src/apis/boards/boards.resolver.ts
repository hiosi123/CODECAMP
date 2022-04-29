import { BoardService } from './boards.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/createBoard.input';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
// @  데코레이터

// :  typescript
@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    ///////////// 캐시에 등록하고 조회하는 연습해보기///////////////
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 0, //"무제한 저장이지만 끄고 키면 없어짐"
    });
    const mycache = await this.cacheManager.get('aaa');
    console.log(mycache);

    return '지금은 캐시 테스트 중!!';
    ///////////////////////////////////////////////////////
    //레디스 연습을 위해서 주석 걸기
    // console.log(writer);
    // console.log(title);
    // console.log(contents);
    // console.log(createBoardInput);
    // return this.boardService.create();
  }
}
