"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("@google-cloud/storage");
let FileService = class FileService {
    async upload({ files }) {
        const storage = new storage_1.Storage({
            keyFilename: 'test1-347705-4972e6935e67.json',
            projectId: 'test1-347705',
        }).bucket('codecamp-mainproject-car');
        console.log(files);
        const waitedFiles = await Promise.all(files);
        const results = await Promise.all(waitedFiles.map((el) => {
            return new Promise((resolve, reject) => {
                el.createReadStream()
                    .pipe(storage.file(el.filename).createWriteStream())
                    .on('finish', () => resolve(`test1-347705/${el.filename}`))
                    .on('error', () => reject());
            });
        }));
        return results;
    }
};
FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map