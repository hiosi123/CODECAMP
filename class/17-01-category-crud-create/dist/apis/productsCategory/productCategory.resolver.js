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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCateogryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const productsCategory_entity_1 = require("./entities/productsCategory.entity");
const productCategory_service_1 = require("./productCategory.service");
let ProductCateogryResolver = class ProductCateogryResolver {
    constructor(productCategoryService) {
        this.productCategoryService = productCategoryService;
    }
    createProductCategory(name) {
        return this.productCategoryService.create({ name });
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => productsCategory_entity_1.ProductCategory),
    __param(0, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductCateogryResolver.prototype, "createProductCategory", null);
ProductCateogryResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [productCategory_service_1.ProductCategoryService])
], ProductCateogryResolver);
exports.ProductCateogryResolver = ProductCateogryResolver;
//# sourceMappingURL=productCategory.resolver.js.map