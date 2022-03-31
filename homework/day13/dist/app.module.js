"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStarbucks = void 0;
const common_1 = require("@nestjs/common");
const boards_module_1 = require("./apis/boards/boards.module");
const apollo_1 = require("@nestjs/apollo");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const board_entity_1 = require("./apis/boards/entities/board.entity");
let createStarbucks = class createStarbucks {
};
createStarbucks = __decorate([
    (0, common_1.Module)({
        imports: [
            boards_module_1.BoardModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: 'src/commons/graphql/schema.gql',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'my-database',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'mydocker02',
                entities: [board_entity_1.Board],
                synchronize: true,
                logging: true,
            }),
        ],
    })
], createStarbucks);
exports.createStarbucks = createStarbucks;
//# sourceMappingURL=app.module.js.map