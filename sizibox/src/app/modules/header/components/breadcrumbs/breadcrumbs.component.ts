import { Component } from '@angular/core';
import { NgForOf, NgIf, SlicePipe } from '@angular/common';
import { selectBreadcrumbs, selectSelectedPath } from '../../../../store/selectors';
import { Store } from '@ngrx/store';
import { selectBreadcrumbsItem, selectFolder } from '../../../../store/actions';
import { FileDetails } from '../../../../models/file-details';

@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        SlicePipe
    ],
    templateUrl: './breadcrumbs.component.html',
    styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
    protected breadcrumbSignal = this.store.selectSignal(selectBreadcrumbs);
    protected rootFolderSignal = this.store.selectSignal(selectSelectedPath);

    constructor(
        private readonly store: Store
    ) {
    }

    protected selectRootFolder() {
        this.store.dispatch(selectFolder({ folder: this.rootFolderSignal()! }));
    }

    protected selectBreadcrumbsEntryItem(entry: FileDetails) {
        this.store.dispatch(selectBreadcrumbsItem({ item: entry }));
    }
}
