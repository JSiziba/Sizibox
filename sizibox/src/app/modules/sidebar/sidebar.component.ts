import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { HttpUtilsService } from '../../services/http-utils.service';
import { FolderPath } from '../../models/folder-path';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgIf,
        NgForOf
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
    protected folders?: FolderPath[];

    constructor(
        private readonly httpUtils: HttpUtilsService
    ) {}

    ngOnInit(): void {
        this.httpUtils
            .getFolderPaths()
            .subscribe((folders) => this.folders = folders);
    }
}
