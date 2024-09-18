import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { FolderPath } from '../models/folder-path';
import { FileDetails } from '../models/file-details';
import { FileType } from '../models/file-type';
import { CentralStoreService } from './central-store.service';

@Injectable({
    providedIn: 'root'
})
export class HttpUtilsService {
    // public readonly baseUrl = "http://localhost:7521"
    public readonly baseUrl = "http://192.168.100.10:5000"


    constructor(
        private http: HttpClient,
        private centralStore: CentralStoreService
    ) { }

    public getFolderPaths(): Observable<FolderPath[]> {
        return this.http.get<FolderPath[]>(`${this.baseUrl}/folder-paths`).pipe(
            tap((folders) => {
                folders.length > 0 && this.centralStore.folderPaths$.next(folders);
            })
        );
    }

    public getFilesInFolder(folderPath: string): Observable<FileDetails[]> {
        const url = `${this.baseUrl}/media-server/files`;
        let params = new HttpParams();
        params = params.append('path', folderPath);

        return this.http.get<FileDetails[]>(url, { params }).pipe(
            map(files => files.sort((a, b) => {
                if (a.type === b.type) {
                    return a.name.localeCompare(b.name);
                }
                return a.type == FileType.FOLDER ? -1 : 1;
            }))
        );
    }

    // stream file

    // download file


    // add folder path

    // delete folder path

    // edit folder path

    // upload file

    // upload files

    // rename file

    // delete file
    public getDownloadPath(path: string) {
        const pathEncoded = encodeURIComponent(path);
        return `${this.baseUrl}/media-server/download?path=${pathEncoded}`;
    }

    public getStreamPath(path: string) {
        const pathEncoded = encodeURIComponent(path);
        return `${this.baseUrl}/media-server/stream-media?path=${pathEncoded}`;
    }
}
