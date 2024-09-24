import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpUtilsService } from '../services/http-utils.service';
import {
    clearBreadcrumbs,
    httpErrorOccurred,
    loadFiles,
    loadFilesSuccess,
    loadFolders,
    loadFoldersSuccess,
     selectBreadcrumbsItem, selectFolder, selectSubFolder
} from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable()
export class FilesEffects {

    constructor(
        private actions$: Actions,
        private httpUtils: HttpUtilsService,
        private store: Store
    ) {}

    // loadFiles$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(loadFiles),
    //         mergeMap((action) => {
    //             return this.httpUtils.getFilesInFolder(action.path).pipe(
    //                 map(files => loadFilesSuccess({ files })),
    //                 catchError((error: HttpErrorResponse) => {
    //                     console.error('Error loading files:', error);
    //                     return of(httpErrorOccurred({ error: error.message }));
    //                 })
    //             );
    //         })
    //     )
    // );

    loadFiles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadFiles),
            switchMap((action) => {
                return this.httpUtils.getFilesInFolder(action.path).pipe(
                    map(files => loadFilesSuccess({ files })),
                    catchError((error: HttpErrorResponse) => {
                        console.error('Error loading files:', error);
                        return of(httpErrorOccurred({ error: error.message }));
                    })
                );
            })
        )
    );



    loadFolders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadFolders),
            switchMap(() => {
                return this.httpUtils.getFolderPaths().pipe(
                    map(folders => loadFoldersSuccess({ folders })),
                    catchError((error: HttpErrorResponse) => {
                        console.error('Error loading folders:', error);
                        return of(httpErrorOccurred({ error: error.message }));
                    })
                )}
            )
        )
    );

    loadFoldersSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadFoldersSuccess),
            tap((action) => {
                this.store.dispatch(clearBreadcrumbs());
                if (action.folders.length > 0) {
                    this.store.dispatch(selectFolder({ folder: action.folders[0] }));
                }
            }),
        ), { dispatch: false }
    );

    folderSelected$ = createEffect(() =>
        this.actions$.pipe(
            ofType(selectFolder),
            tap((action) => {
                this.store.dispatch(clearBreadcrumbs());
                this.store.dispatch(loadFiles({ path: action.folder.path }));
            }),
        ), { dispatch: false }
    );

    subFolderSelected$ = createEffect(() =>
        this.actions$.pipe(
            ofType(selectSubFolder),
            tap((action) => {
                this.store.dispatch(loadFiles({ path: action.subFolder.path }));
            }),
        ), { dispatch: false }
    );

    breadcrumbsItemSelected$ = createEffect(() =>
        this.actions$.pipe(
            ofType(selectBreadcrumbsItem),
            tap((action) => {
                this.store.dispatch(loadFiles({ path: action.item.path }));
            }),
        ), { dispatch: false }
    );

}
