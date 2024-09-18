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
export class MediaPlayerComponent implements OnInit {
    @Input() fileDetails!: FileDetails;
    @Output() close = new EventEmitter<null>();
    protected readonly FileType = FileType;
    protected countDownTimer = 0;

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

    ngOnInit(): void {

    }

    protected onMouseMove() {
        if (this.countDownTimer === 0){
            this.countDownTimer = 5;
            this.countDown();
            return;
        }
        this.countDownTimer = 5;
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
