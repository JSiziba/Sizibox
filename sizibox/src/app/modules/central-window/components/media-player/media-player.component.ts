import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileDetails } from '../../../../models/file-details';
import { HttpUtilsService } from '../../../../services/http-utils.service';
import { NgIf } from '@angular/common';
import { FileType } from '../../../../models/file-type';

@Component({
    selector: 'app-media-player',
    standalone: true,
    imports: [
        NgIf
    ],
    templateUrl: './media-player.component.html',
    styleUrl: './media-player.component.scss'
})
export class MediaPlayerComponent {
    @Input() fileDetails!: FileDetails;
    @Output() close = new EventEmitter<null>();
    protected readonly FileType = FileType;
    protected countDownTimer = 0;
    protected controlsHover: boolean = false;

    constructor(
        private readonly httpUtils: HttpUtilsService,
    ) {
        this.onMouseMove();
    }

    protected get downloadPath() {
        return this.httpUtils.getDownloadPath(this.fileDetails.path);
    }

    protected get streamPath() {
        return this.httpUtils.getStreamPath(this.fileDetails.path);
    }

    protected onMouseMove() {
        if (this.countDownTimer === 0){
            this.countDownTimer = 1;
            this.countDown();
            return;
        }
        this.countDownTimer = 1;
    }

    protected countDown() {
        setTimeout(() => {
            if (this.countDownTimer > 0 ) {
                this.countDownTimer --;
                this.countDown();
            }
        }, 1000);
    }

    protected closeClicked() {
        this.close.emit();
    }

    protected downloadClicked() {

    }
}
