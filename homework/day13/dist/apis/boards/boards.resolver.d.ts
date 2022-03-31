import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
export declare class BoardResolver {
    private readonly boardService;
    constructor(boardService: BoardService);
    fetchBoards(): {
        number: number;
        writer: string;
        title: string;
        contents: string;
    }[];
    createBoard(drinks: string, cost: string, kcal: number, fat: number, natrium: number, sugar: number, caffeine: number, createBoardInput: CreateBoardInput): string;
}
