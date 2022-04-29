import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';
import { BigQuery } from '@google-cloud/bigquery';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(connection: Connection) {
    connection.subscribers.push(this); //데이터베이스와의 연결
  }

  listenTo() {
    return Product;
  }

  afterInsert(event: InsertEvent<Product>) {
    console.log(event); //방금전에 입력했던 내용이 들어온다, 로그는 데이터를 계속해서 쌓이는 것이다. 무작위로 발생하는 로그성 데이터는 빅쿼리에 담는다.
    //event.entity.id
    //event.entity.name
    const bigQuery = new BigQuery({
      keyFilename: 'gcp-bigquery.json',
      projectId: 'test1-347705',
    });

    //로그는 그때그때의 기록을 남긴다.

    bigQuery
      .dataset('mybigquery02')
      .table('productlog')
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);
  }
}
