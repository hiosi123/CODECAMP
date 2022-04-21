import { FileUpload } from 'graphql-upload';
interface Ifile {
    files: FileUpload[];
}
export declare class FileService {
    upload({ files }: Ifile): Promise<unknown[]>;
}
export {};
