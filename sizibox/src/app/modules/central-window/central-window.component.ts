import { Component, OnInit } from '@angular/core';
import { HttpUtilsService } from '../../services/http-utils.service';
import { FileDetails } from '../../models/file-details';
import { FileCardComponent } from './components/file-card/file-card.component';
import { NgForOf, NgIf } from '@angular/common';
import { CentralStoreService } from '../../services/central-store.service';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { Router } from '@angular/router';
import { FileType } from '../../models/file-type';

@Component({
    selector: 'app-central-window',
    standalone: true,
    imports: [
        FileCardComponent,
        NgForOf,
        MediaPlayerComponent,
        NgIf
    ],
    templateUrl: './central-window.component.html',
    styleUrl: './central-window.component.scss'
})
export class CentralWindowComponent implements OnInit {
    protected files?: FileDetails[];
    protected selectedFile?: FileDetails;
    protected showMediaPlayer: boolean = false;

    constructor(
        private readonly httpUtils: HttpUtilsService,
        private readonly centralStore: CentralStoreService,
        protected router: Router
    ) { }

    ngOnInit(): void {
        this.centralStore.selectedFolderPath$.subscribe((folderPath) => {
            if (folderPath) {
                this.getFileDetails(folderPath.path);
            }
        });
        this.centralStore.breadcrumbs$.subscribe((breadcrumbs) => {
            if (breadcrumbs.length > 0) {
                this.getFileDetails(breadcrumbs[breadcrumbs.length - 1].path);
            }
        });
    }

    private getFileDetails(filePath: string): void {
        this.httpUtils.getFilesInFolder(filePath).subscribe((files) => {
            this.files = files;
        });
    }

    protected onFileClicked($event: FileDetails) {
        const mediaTypes = [FileType.VIDEO, FileType.IMAGE, FileType.AUDIO];
        if (mediaTypes.find(t => t === $event.type)) {
            this.selectedFile = $event;
            this.showMediaPlayer = true;
            return;
        }
        if ($event.type === FileType.FOLDER) {
            this.openFolder($event);
            return;
        }
        window.location.href = this.httpUtils.getDownloadPath($event.path);
    }

    private openFolder(folder: FileDetails) {
        this.centralStore.addBreadcrumbs([folder]);
        this.showMediaPlayer = false;
    }
}
