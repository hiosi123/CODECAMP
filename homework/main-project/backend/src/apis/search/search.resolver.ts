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
  //       console.log('π', redisGet);
  //       return redisGet;
  //     }
  //     console.log(redisGet);
  //     const elasticGet = await this.searchService.elasticSearchAll({
  //       searchWord,
  //     });

  //     console.log('π', JSON.stringify(elasticGet));
  //     console.log('π', elasticGet['hits']['hits'][0]['_source']['modelname']);
  //     console.log('π', elasticGet['hits']['hits'][0]['_source']['id']);

  //     const values = [];

  //     for (let i = 0; i < elasticGet['hits']['hits'].length; i++) {
  //       const value = elasticGet['hits']['hits'][i]['_source']['id'];

  //       values.push(value);
  //     }
  //     console.log('π₯²', values);
  //     await this.searchService.redisSaveAll({ searchWord, values });
  //   }

  @Query(() => [Used_car])
  async searchUsedCar(
    @Args('carintro') carintro: string, //
  ) {
    //1. λ λμ€μμ λ€κ³ μ¨λ€
    const redisGet = await this.searchService.redisGetAll({ carintro });
    if (redisGet) {
      console.log('πfrom redis');
      return redisGet;
    }

    //2. λ λμ€μ μμΌλ©΄ μΌλΌμ€ν±μμ λ€κ³ μ΄
    const elasticGet = await this.searchService.elasticSearchAll({
      carintro,
    });

    //3. μΌλΌμ€ν±μμ μ¨ μ λ³΄λ€
    const values = [];
    for (let i = 0; i < elasticGet['hits']['hits'].length; i++) {
      const all = elasticGet['hits']['hits'][i]['_source'];

      all['reportNumber'] = all['reportnumber'];
      all['carIntro'] = all['carintro'];
      all['gear'] = {
        id: all['gearid'],
        name: all['gearname'],
      };
      all['fuel'] = {
        id: all['fuelid'],
        name: all['fuelname'],
      };
      all['carkind'] = {
        id: all['carkindid'],
        name: all['carkindname'],
      };
      all['model'] = {
        id: all['modelid'],
        name: all['modelname'],
      };
      all['driveMethod'] = {
        id: all['drivemethodid'],
        name: all['drivemethodname'],
      };

      console.log(elasticGet['hits']['hits'][i]['_source']);
      values.push(all);
    }
    console.log('π', elasticGet['hits']['hits'][0]['_source']);
    // console.log('π', elasticGet['hits']['hits'][0]['_source']['name']);

    //4. λ¦¬ν΄νκΈ°μ μ λ λμ€μ μ μ₯

    await this.searchService.redisSaveAll({ carintro, values });

    console.log('π₯² from elastic');
    return values;
  }
}
