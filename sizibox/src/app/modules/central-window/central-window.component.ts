import { Component } from '@angular/core';
import { HttpUtilsService } from '../../services/http-utils.service';
import { FileDetails } from '../../models/file-details';
import { FileCardComponent } from './components/file-card/file-card.component';
import { NgForOf, NgIf } from '@angular/common';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { Router } from '@angular/router';
import { FileType } from '../../models/file-type';
import { Store } from '@ngrx/store';
import { selectFiles, selectFilesLoading } from '../../store/selectors';
import { selectSubFolder } from '../../store/actions';
import { AddMenuComponent } from '../../add-menu/add-menu.component';

@Component({
    selector: 'app-central-window',
    standalone: true,
    imports: [
        FileCardComponent,
        NgForOf,
        MediaPlayerComponent,
        NgIf,
        AddMenuComponent
    ],
    templateUrl: './central-window.component.html',
    styleUrl: './central-window.component.scss'
})
export class CentralWindowComponent {
    protected filesSignal = this.store.selectSignal(selectFiles);
    protected filesLoadingSignal = this.store.selectSignal(selectFilesLoading);
    protected selectedFile?: FileDetails;
    protected showMediaPlayer: boolean = false;

    constructor(
        private readonly httpUtils: HttpUtilsService,
        protected router: Router,
        protected store: Store
    ) {

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
        this.store.dispatch(selectSubFolder({ subFolder: folder }));
    }
}
