import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FolderPath } from '../models/folder-path';
import { FileDetails } from '../models/file-details';

@Injectable({
    providedIn: 'root'
})
export class CentralStoreService {
    public folderPaths$: BehaviorSubject<FolderPath[]> = new BehaviorSubject<FolderPath[]>([]);
    public breadcrumbs$: BehaviorSubject<FileDetails[]> = new BehaviorSubject<FileDetails[]>([]);
    public selectedFolderPath$: BehaviorSubject<FolderPath | undefined> = new BehaviorSubject<FolderPath | undefined>(undefined);

    constructor() {
        this.folderPaths$.subscribe((paths) => {
            if (paths.length > 0) {
                this.selectedFolderPath$.next(paths[0]);
            }
        });
    }

    public addBreadcrumbs(breadcrumbs: FileDetails[]): void {
        const currentBreadcrumbs = this.breadcrumbs$.getValue();
        const newBreadcrumbs = [...currentBreadcrumbs, ...breadcrumbs];
        this.breadcrumbs$.next(newBreadcrumbs);
    }

    public navigateToBreadcrumbsEntry(file: FileDetails): void {
        const breadcrumbs = this.breadcrumbs$.getValue();
        const index = breadcrumbs.findIndex((b) => b.path === file.path);
        if (index >= 0) {
            const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
            this.breadcrumbs$.next(newBreadcrumbs);
        }
    }

    public clearBreadcrumbs(): void {
        this.breadcrumbs$.next([]);
        this.selectedFolderPath$.next(this.selectedFolderPath$.getValue());
    }
}
