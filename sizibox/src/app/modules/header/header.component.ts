import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage, SlicePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBreadcrumbs, selectSelectedPath } from '../../store/selectors';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgForOf,
        AsyncPipe,
        SlicePipe,
        NgIf,
        MobileMenuComponent,
        BreadcrumbsComponent
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    protected showMobileMenuFlag: boolean = false;

    constructor(
        private readonly store: Store
    ) {
    }

    protected toggleMobileMenu() {
        this.showMobileMenuFlag = !this.showMobileMenuFlag;
    }
}
