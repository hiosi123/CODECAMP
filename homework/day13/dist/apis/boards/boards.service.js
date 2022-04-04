"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
let BoardService = class BoardService {
    findAll() {
        return [
            {
                drinks: '아메리카노5',
                cost: '5000원',
                kcal: 100,
                fat: 200,
                natrium: 10,
                sugar: 213123,
                caffeine: 123,
            },
            {
                drinks: '아메리카노4',
                cost: '500원',
                kcal: 1001,
                fat: 20023,
                natrium: 10123,
                sugar: 213121233,
                caffeine: 121233,
            },
            {
                drinks: '아메리카노3',
                cost: '5000원',
                kcal: 101230,
                fat: 200123,
                natrium: 10,
                sugar: 21312233,
                caffeine: 12233,
            },
            {
                drinks: '아메리카노2',
                cost: '5000원',
                kcal: 10230,
                fat: 20023,
                natrium: 1032,
                sugar: 2131223323,
                caffeine: 12233,
            },
            {
                drinks: '아메리카노1',
                cost: '5000원',
                kcal: 100,
                fat: 200,
                natrium: 10,
                sugar: 213123,
                caffeine: 12323,
            },
        ];
    }
    create() {
        return '등록에 성공 했습니다';
    }
};
BoardService = __decorate([
    (0, common_1.Injectable)()
], BoardService);
exports.BoardService = BoardService;
//# sourceMappingURL=boards.service.js.map