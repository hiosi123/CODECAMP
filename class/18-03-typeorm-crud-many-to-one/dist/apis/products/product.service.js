"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const productSaleslocation_entity_1 = require("../productsSaleslocation/entities/productSaleslocation.entity");
const product_entity_1 = require("./entities/product.entity");
let ProductService = class ProductService {
    constructor(productRepository, productSaleslocationRepository) {
        this.productRepository = productRepository;
        this.productSaleslocationRepository = productSaleslocationRepository;
    }
    async findAll() {
        return await this.productRepository.find({
            relations: ['productSaleslocation', 'productCategory'],
        });
    }
    async fineOne({ productId }) {
        return await this.productRepository.findOne({
            where: { id: productId },
            relations: ['productSaleslocation', 'productCategory'],
        });
    }
    async create({ createProductInput }) {
        const { productSaleslocation, productCategoryId } = createProductInput, rest = __rest(createProductInput, ["productSaleslocation", "productCategoryId"]);
        const result = await this.productSaleslocationRepository.save(Object.assign({}, productSaleslocation));
        const result2 = await this.productRepository.save(Object.assign(Object.assign({}, rest), { productSaleslocation: result, productCategory: { id: productCategoryId } }));
        return result2;
    }
    async update({ productId, updateProductInput }) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        const newProduct = Object.assign(Object.assign({}, product), updateProductInput);
        return await this.productRepository.save(newProduct);
    }
    async checkSoldout({ productId }) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (product.isSoldout)
            throw new common_1.UnprocessableEntityException('이미 판매 완료된 상품입니다');
    }
    async delete({ productId }) {
        const result = await this.productRepository.softDelete({ id: productId });
        return result.affected ? true : false;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(productSaleslocation_entity_1.ProductSaleslocation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map