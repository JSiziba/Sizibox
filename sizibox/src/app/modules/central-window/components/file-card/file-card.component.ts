import { Component, Input } from '@angular/core';
import { FileDetails } from '../../../../models/file-details';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { FileType } from '../../../../models/file-type';
import { HttpUtilsService } from '../../../../services/http-utils.service';

@Component({
    selector: 'app-file-card',
    standalone: true,
    imports: [
        NgOptimizedImage,
        AsyncPipe
    ],
    templateUrl: './file-card.component.html',
    styleUrl: './file-card.component.scss'
})
export class FileCardComponent {
    @Input() fileDetails!: FileDetails;

    protected readonly FileType = FileType;

    constructor(
        private readonly httpUtils: HttpUtilsService
    ) {
    }

    protected getDownloadPath(path: string) {
        const pathEncoded = encodeURIComponent(path);
        return `${this.httpUtils.baseUrl}/media-server/download?path=${pathEncoded}`;
    }
}
