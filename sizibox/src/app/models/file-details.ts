import { FileType } from './file-type';

export interface FileDetails {
    name: string;
    path: string;
    type: FileType;
    size: string;
    lastModified: Date;
}
