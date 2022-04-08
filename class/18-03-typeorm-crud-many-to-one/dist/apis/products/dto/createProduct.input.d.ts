import { ProductSaleslocationInput } from 'src/apis/productsSaleslocation/dto/productSaleslocation.input';
export declare class CreateProductInput {
    name: string;
    description: string;
    price: number;
    productSaleslocation: ProductSaleslocationInput;
    productCategoryId: string;
}
