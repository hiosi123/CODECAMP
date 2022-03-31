import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  findAll() {
    //DB에 접속해서 데이터를 꺼내오는 로직

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
    // 디비에 접속해서 데이터를 등록하는 로직

    return '등록에 성공 했습니다';
  }
}
