import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
export declare class BoardResolver {
    private readonly boardService;
    constructor(boardService: BoardService);
    fetchStarbucks(): {
        drinks: string;
        cost: string;
        kcal: number;
        fat: number;
        natrium: number;
        sugar: number;
        caffeine: number;
    }[];
    createStarbucks(drinks: string, cost: string, createBoardInput: CreateBoardInput): string;
}
