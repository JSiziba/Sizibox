import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FolderPath } from '../models/folder-path';
import { FileDetails } from '../models/file-details';
import { FileType } from '../models/file-type';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpUtilsService {
    public readonly baseUrl = environment.baseUrl;

    constructor(
        private http: HttpClient
    ) { }

    public getFolderPaths(): Observable<FolderPath[]> {
        return this.http.get<FolderPath[]>(`${this.baseUrl}/folder-paths`);
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

    public uploadFiles(formData: FormData, path: string): Observable<FileDetails[]> {
        return this.http.post<FileDetails[]>(`${this.baseUrl}/media-server/uploadFiles`, formData, {
            params: { path }
        });
    }

    public addNewFolder(folderName: string, path: string): Observable<FileDetails> {
        return this.http.post<FileDetails>(`${this.baseUrl}/media-server/add-new-folder`, { folderName, path });
    }
}
