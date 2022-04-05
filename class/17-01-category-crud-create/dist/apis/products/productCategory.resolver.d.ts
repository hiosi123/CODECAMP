import { ProductCategoryService } from './productCategory.service';
export declare class ProductCateogryResolver {
    private readonly productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
    createPorductCategory(name: string): Promise<any>;
}
