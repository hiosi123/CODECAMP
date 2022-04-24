import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Model } from '../carModel/entities/carModel.entity';
import { Used_car } from '../used_cars/entities/used_car.entity';

import { SearchService } from './search.service';

@Resolver()
export class SearchResolver {
  constructor(
    private readonly searchService: SearchService, //
  ) {}

  //   @Query(() => [Model])
  //   async searchModels(
  //     @Args('searchWord') searchWord: string, //
  //   ) {
  //     const redisGet = await this.searchService.redisGetAll({ searchWord });
  //     if (redisGet) {
  //       console.log('😇', redisGet);
  //       return redisGet;
  //     }
  //     console.log(redisGet);
  //     const elasticGet = await this.searchService.elasticSearchAll({
  //       searchWord,
  //     });

  //     console.log('🍎', JSON.stringify(elasticGet));
  //     console.log('🍌', elasticGet['hits']['hits'][0]['_source']['modelname']);
  //     console.log('🍟', elasticGet['hits']['hits'][0]['_source']['id']);

  //     const values = [];

  //     for (let i = 0; i < elasticGet['hits']['hits'].length; i++) {
  //       const value = elasticGet['hits']['hits'][i]['_source']['id'];

  //       values.push(value);
  //     }
  //     console.log('🥲', values);
  //     await this.searchService.redisSaveAll({ searchWord, values });
  //   }

  @Query(() => [Int])
  async searchUsedCar(
    @Args('carintro') carintro: string, //
  ) {
    const redisGet = await this.searchService.redisGetAll({ carintro });
    if (redisGet) {
      console.log('😇from redis', redisGet);
      return redisGet;
    }
    console.log(redisGet);
    const elasticGet = await this.searchService.elasticSearchAll({
      carintro,
    });

    console.log('🍎', JSON.stringify(elasticGet));
    console.log('🍌', elasticGet['hits']['hits'][0]['_source']['carintro']);
    console.log('🍟', elasticGet['hits']['hits'][0]['_source']['car_id']);

    const values = [];

    for (let i = 0; i < elasticGet['hits']['hits'].length; i++) {
      const value = elasticGet['hits']['hits'][i]['_source']['car_id'];

      values.push(value);
    }
    console.log('🥲from elastic', values);
    await this.searchService.redisSaveAll({ carintro, values });
    return values;
  }
}
