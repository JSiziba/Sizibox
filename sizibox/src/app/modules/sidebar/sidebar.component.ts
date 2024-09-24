import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { HttpUtilsService } from '../../services/http-utils.service';
import { FolderPath } from '../../models/folder-path';
import { Store } from '@ngrx/store';
import { selectFolders, selectSelectedPath } from '../../store/selectors';
import { selectFolder } from '../../store/actions';

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
export class SidebarComponent {
    protected foldersSignal = this.store.selectSignal(selectFolders);
    protected selectedFolderSignal = this.store.selectSignal(selectSelectedPath);

    constructor(
        private readonly httpUtils: HttpUtilsService,
        private readonly store: Store
    ) {
    }

    protected selectFolder(folder: FolderPath): void {
        this.store.dispatch(selectFolder({ folder }));
    }
}
