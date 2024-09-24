import { Component, computed } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { HttpUtilsService } from '../services/http-utils.service';
import { selectBreadcrumbs, selectSelectedPath } from '../store/selectors';
import { Store } from '@ngrx/store';
import { loadFiles } from '../store/actions';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-menu',
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        NgClass
    ],
    templateUrl: './add-menu.component.html',
    styleUrl: './add-menu.component.scss'
})
export class AddMenuComponent {
    protected showFabFlag: boolean = true;
    protected showAddOptionsMenuFlag: boolean = false;
    protected showAddFolderFlag: boolean = false;
    protected showUploadFilesFlag: boolean = false;
    protected isLoading: boolean = false;
    protected errorMessage?: string;
    protected selectedFiles: File[] = [];
    protected folderName: string = '';

    protected selectedFolderSignal = this.store.selectSignal(selectSelectedPath);
    protected breadcrumbsSignal = this.store.selectSignal(selectBreadcrumbs);
    protected currentPathSignal = computed(() => {
        const selectedFolder = this.selectedFolderSignal();
        const breadcrumbs = this.breadcrumbsSignal();
        if (breadcrumbs.length === 0 && selectedFolder) {
            return {
                name: selectedFolder.name,
                path: selectedFolder.path,
            }
        }
        if (breadcrumbs.length > 0) {
            return {
                name: breadcrumbs[breadcrumbs.length - 1].name,
                path: breadcrumbs[breadcrumbs.length - 1].path,
            }
        }
        return undefined;
    });

    constructor(
        protected httpUtils: HttpUtilsService,
        protected store: Store,
    ) {
    }

    protected showFab() {
        this.hideOtherMenus('fab');
        this.showFabFlag = true;
    }

    protected showAddOptionsMenu() {
        this.hideOtherMenus('addOptionsMenu');
        this.showAddOptionsMenuFlag = true;
    }

    protected showAddFolder() {
        this.hideOtherMenus('addFolder');
        this.showAddFolderFlag = true;
    }

    protected showUploadFiles() {
        this.hideOtherMenus('uploadFiles');
        this.showUploadFilesFlag = true;
    }

    protected hideOtherMenus(currentMenu: string) {
        if (currentMenu === 'addOptionsMenu') {
            this.showAddFolderFlag = false;
            this.showUploadFilesFlag = false;
            this.showFabFlag = false;
        } else if (currentMenu === 'addFolder') {
            this.showAddOptionsMenuFlag = false;
            this.showUploadFilesFlag = false;
            this.showFabFlag = false;
        } else if (currentMenu === 'uploadFiles') {
            this.showAddOptionsMenuFlag = false;
            this.showAddFolderFlag = false;
            this.showFabFlag = false;
        }
        else {
            this.showAddOptionsMenuFlag = false;
            this.showAddFolderFlag = false;
            this.showUploadFilesFlag = false;
        }
    }

    protected onFilesSelected($event: Event) {
        const input = $event.target as HTMLInputElement;
        if (input.files) {
            this.selectedFiles = Array.from(input.files);
        }
    }

    protected submitFiles() {
        this.isLoading = true;

        const formData = new FormData();
        this.selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        this.httpUtils.uploadFiles(formData, this.currentPathSignal()!.path)
            .subscribe({
                next: () => {
                    this.isLoading = false;
                    this.showFab();
                    this.selectedFiles = [];
                    this.store.dispatch(loadFiles( {path: this.currentPathSignal()!.path}));
                },
                error: (e) => {
                    this.isLoading = false;
                    this.errorMessage = e.error;
                }
            });
    }

    protected submitFolder() {
        this.isLoading = true;

        this.httpUtils.addNewFolder(this.folderName, this.currentPathSignal()!.path)
            .subscribe({
                next: () => {
                    this.isLoading = false;
                    this.showFab();
                    this.folderName = '';
                    this.store.dispatch(loadFiles( {path: this.currentPathSignal()!.path}));
                },
                error: (err) => {
                    this.isLoading = false;
                    this.errorMessage = err.error;
                }
            });
    }
}
