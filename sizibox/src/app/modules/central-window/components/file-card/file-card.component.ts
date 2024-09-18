import { afterRender, AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FileDetails } from '../../../../models/file-details';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { FileType } from '../../../../models/file-type';
import { HttpUtilsService } from '../../../../services/http-utils.service';
import { TimeAgoPipe } from '../../../../pipes/time-ago.pipe';

@Component({
    selector: 'app-file-card',
    standalone: true,
    imports: [
        NgOptimizedImage,
        AsyncPipe,
        TimeAgoPipe
    ],
    templateUrl: './file-card.component.html',
    styleUrl: './file-card.component.scss'
})
export class FileCardComponent {
    @Input() fileDetails!: FileDetails;
    @Output() fileClicked = new EventEmitter<FileDetails>();

    protected readonly FileType = FileType;
    private hoverTimeout: any;

    constructor(
        private readonly httpUtils: HttpUtilsService
    ) {
        afterRender(() => {
            document.dispatchEvent(new Event('click'));
        });
    }

    protected getDownloadPath(path: string) {
        return this.httpUtils.getDownloadPath(path);
    }

    protected getStreamPath(path: string) {
        return this.httpUtils.getStreamPath(path);
    }

    protected onVideoHover($event: MouseEvent) {
        const video = $event.target as HTMLVideoElement;
        this.hoverTimeout = setTimeout(() => {
            video.muted = true;
            video.play();
        } , 1000);
    }

    protected videoUnHover($event: MouseEvent) {
        clearTimeout(this.hoverTimeout);
        const video = $event.target as HTMLVideoElement;
        video.pause();
    }

    protected onFileClick() {
        this.fileClicked.emit(this.fileDetails);
    }
}
