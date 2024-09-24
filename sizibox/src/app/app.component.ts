import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { CentralWindowComponent } from './modules/central-window/central-window.component';
import { HeaderComponent } from './modules/header/header.component';
import { Store } from '@ngrx/store';
import { loadFolders } from './store/actions';
import { isPlatformBrowser } from '@angular/common';
import { AddMenuComponent } from './add-menu/add-menu.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SidebarComponent, CentralWindowComponent, HeaderComponent, AddMenuComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor(
        private readonly store: Store,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
       if (isPlatformBrowser(this.platformId)) {
           this.store.dispatch(loadFolders());
       }
    }
}
