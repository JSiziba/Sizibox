import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage, SlicePipe } from '@angular/common';
import { FileDetails } from '../../models/file-details';
import { CentralStoreService } from '../../services/central-store.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgForOf,
        AsyncPipe,
        SlicePipe,
        NgIf
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    protected breadcrumbs: FileDetails[] = [];

    constructor(
        protected centralStoreService: CentralStoreService
    ) {
    }

    ngOnInit(): void {
        this.centralStoreService.breadcrumbs$.subscribe((breadcrumbs) => {
            this.breadcrumbs = breadcrumbs;
        });
    }

    protected navigateToBreadcrumbsEntry(file: FileDetails): void {
        this.centralStoreService.navigateToBreadcrumbsEntry(file);
    }

    protected clearBreadcrumbs() {
        this.centralStoreService.clearBreadcrumbs();
    }
}
