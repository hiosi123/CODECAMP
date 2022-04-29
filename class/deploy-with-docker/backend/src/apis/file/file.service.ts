import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

interface Ifile {
  files: FileUpload[];
}

@Injectable()
export class FileService {
  async upload({ files }: Ifile) {
    const storage = new Storage({
      keyFilename: 'test1-347705-4972e6935e67.json',
      projectId: 'test1-347705',
    }).bucket('codecamp-mainproject-car');

    //일단 먼저 다 받기
    const waitedFiles = await Promise.all(files);

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream()) //pipe 업로드를 하고 난 후 2차적인 작업을 하고 싶을때
            .on('finish', () => resolve(`test1-347705/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    ); //[file,file,file,file...]

    return results;
  }
}
