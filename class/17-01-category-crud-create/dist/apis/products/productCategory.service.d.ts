import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productsCategory.entity';
export declare class ProductCategoryService {
    private readonly productCategoryRepository;
    constructor(productCategoryRepository: Repository<ProductCategory>);
    create({ name }: {
        name: any;
    }): Promise<any>;
}
