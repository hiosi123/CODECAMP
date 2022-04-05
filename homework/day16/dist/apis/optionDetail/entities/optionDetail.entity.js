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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionDetail = void 0;
const used_car_entity_1 = require("../../used_cars/entities/used_car.entity");
const typeorm_1 = require("typeorm");
let OptionDetail = class OptionDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OptionDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OptionDetail.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => used_car_entity_1.Used_car, (used_car) => used_car.optionDetail),
    __metadata("design:type", Array)
], OptionDetail.prototype, "used_car", void 0);
OptionDetail = __decorate([
    (0, typeorm_1.Entity)()
], OptionDetail);
exports.OptionDetail = OptionDetail;
//# sourceMappingURL=optionDetail.entity.js.map