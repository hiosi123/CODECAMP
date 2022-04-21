import { ProductCategory } from './entities/productsCategory.entity';
import { ProductCategoryService } from './productCategory.service';
export declare class ProductCateogryResolver {
    private readonly productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
    createProductCategory(name: string): Promise<{
        name: any;
    } & ProductCategory>;
}
