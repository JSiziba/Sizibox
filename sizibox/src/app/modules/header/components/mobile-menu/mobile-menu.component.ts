import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFolders, selectSelectedPath } from '../../../../store/selectors';
import { NgClass, NgForOf } from '@angular/common';
import { FolderPath } from '../../../../models/folder-path';
import { selectFolder } from '../../../../store/actions';

@Component({
    selector: 'app-mobile-menu',
    standalone: true,
    imports: [
        NgForOf,
        NgClass
    ],
    templateUrl: './mobile-menu.component.html',
    styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {
    @Output() close = new EventEmitter<void>();
    protected foldersSignal = this.store.selectSignal(selectFolders);
    protected selectedFolderSignal = this.store.selectSignal(selectSelectedPath);

    constructor(
        private readonly store: Store
    ) {
    }

    protected closeMenu() {
        this.close.emit();
    }

    protected selectFolder(folder: FolderPath): void {
        this.store.dispatch(selectFolder({ folder }));
        this.closeMenu();
    }
}
