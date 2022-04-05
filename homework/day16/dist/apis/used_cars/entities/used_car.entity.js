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
exports.Used_car = void 0;
const carKind_entity_1 = require("../../carKind/entities/carKind.entity");
const carModel_entity_1 = require("../../carModel/entities/carModel.entity");
const dealer_entity_1 = require("../../dealer/entities/dealer.entity");
const driveMethod_entity_1 = require("../../driveMethod/entities/driveMethod.entity");
const fuel_entity_1 = require("../../fuel/entities/fuel.entity");
const gearKind_entity_1 = require("../../gearKind/entities/gearKind.entity");
const insuranceStatus_entity_1 = require("../../insuranceStatus/entities/insuranceStatus.entity");
const optionDetail_entity_1 = require("../../optionDetail/entities/optionDetail.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Used_car = class Used_car {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Used_car.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Used_car.prototype, "car_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Used_car.prototype, "is_nativeCar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Used_car.prototype, "cc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Used_car.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Used_car.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Used_car.prototype, "km", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Used_car.prototype, "seater", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Used_car.prototype, "reportNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Used_car.prototype, "is_seizuer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Used_car.prototype, "carIntro", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Used_car.prototype, "is_accident", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Used_car.prototype, "is_repair", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Used_car.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Used_car.prototype, "is_sold", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => gearKind_entity_1.Gear),
    __metadata("design:type", gearKind_entity_1.Gear)
], Used_car.prototype, "gear", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => fuel_entity_1.Fuel),
    __metadata("design:type", fuel_entity_1.Fuel)
], Used_car.prototype, "fuel", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => carKind_entity_1.CarKind),
    __metadata("design:type", carKind_entity_1.CarKind)
], Used_car.prototype, "carkind", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => driveMethod_entity_1.DriveMethod),
    __metadata("design:type", driveMethod_entity_1.DriveMethod)
], Used_car.prototype, "driveMethod", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => carModel_entity_1.Model),
    __metadata("design:type", carModel_entity_1.Model)
], Used_car.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dealer_entity_1.Dealer),
    __metadata("design:type", dealer_entity_1.Dealer)
], Used_car.prototype, "dealer", void 0);
__decorate([
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => insuranceStatus_entity_1.InsuranceStatus, (insurance) => insurance.used_car),
    __metadata("design:type", Array)
], Used_car.prototype, "insurance", void 0);
__decorate([
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => optionDetail_entity_1.OptionDetail, (optionDetail) => optionDetail.used_car),
    __metadata("design:type", Array)
], Used_car.prototype, "optionDetail", void 0);
__decorate([
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.used_car),
    __metadata("design:type", user_entity_1.User)
], Used_car.prototype, "user", void 0);
Used_car = __decorate([
    (0, typeorm_1.Entity)()
], Used_car);
exports.Used_car = Used_car;
//# sourceMappingURL=used_car.entity.js.map