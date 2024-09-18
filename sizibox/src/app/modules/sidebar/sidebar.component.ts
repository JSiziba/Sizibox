import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { HttpUtilsService } from '../../services/http-utils.service';
import { FolderPath } from '../../models/folder-path';
import { CentralStoreService } from '../../services/central-store.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgIf,
        NgForOf,
        NgClass
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
    protected folders?: FolderPath[];
    protected selectedFolder?: FolderPath;

    constructor(
        private readonly httpUtils: HttpUtilsService,
        private readonly centralStore: CentralStoreService
    ) {}

    ngOnInit(): void {
        this.httpUtils
            .getFolderPaths()
            .subscribe((folders) => this.folders = folders);

        this.centralStore.selectedFolderPath$.subscribe((folder) => {
            this.selectedFolder = folder;
        });
    }

    protected selectFolder(folder: FolderPath): void {
        this.selectedFolder = folder;
        this.centralStore.selectedFolderPath$.next(folder);
        this.centralStore.clearBreadcrumbs();
    }
}
