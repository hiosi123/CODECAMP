import { BoardService } from './boards.service';
import { Query, Resolver } from '@nestjs/graphql';
// @  데코레이터

// :  typescript
@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => String) //String Int Boolean
  fetchBoards(): string {
    //number boolean
    return this.boardService.aaa();
  }
}
