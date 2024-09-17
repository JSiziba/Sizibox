import { Component, OnInit } from '@angular/core';
import { HttpUtilsService } from '../../services/http-utils.service';
import { FileDetails } from '../../models/file-details';
import { FileCardComponent } from './components/file-card/file-card.component';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-central-window',
    standalone: true,
    imports: [
        FileCardComponent,
        NgForOf
    ],
    templateUrl: './central-window.component.html',
    styleUrl: './central-window.component.scss'
})
export class CentralWindowComponent implements OnInit {
    protected files?: FileDetails[];

    constructor(
        private readonly httpUtils: HttpUtilsService
    ) { }
    ngOnInit(): void {
        this.httpUtils.getFilesInFolder('C:\\Users\\JohnsonS\\Pictures\\Screenshots').subscribe((files) => {
            this.files = files;
        });
    }

}
