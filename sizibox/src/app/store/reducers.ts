import { initialSiziboxState } from './store';
import { createReducer, on } from '@ngrx/store';
import {
    selectSubFolder, clearBreadcrumbs, fileAdded,
    httpErrorOccurred,
    loadFiles,
    loadFilesSuccess,
    loadFolders,
    loadFoldersSuccess,
    resetFiles,
    resetFolders, selectBreadcrumbsItem, selectFolder
} from './actions';

export const siziboxReducer = createReducer(
    initialSiziboxState,

    on(httpErrorOccurred, (state, { error }) => (
        {
            ...state,
            error,
            loading: false,
        }
    )),
    on(loadFiles, (state) => (
        {
            ...state,
            filesLoading: true,
            files: [],
        }
    )),
    on(loadFilesSuccess, (state, { files }) => (
        {
            ...state,
            files,
            filesLoading: false,
        }
    )),
    on(resetFiles, (state) => (
        {
            ...state,
            files: [],
            filesLoading: false,

        }
    )),
    on(loadFolders, (state) => (
        {
            ...state,
            foldersLoading: true,
            folders: [],
        }
    )),
    on(loadFoldersSuccess, (state, { folders }) => (
        {
            ...state,
            folders,
            foldersLoading: false,
        }
    )),
    on(resetFolders, (state) => (
        {
            ...state,
            folders: [],
            foldersLoading: false,
        }
    )),
    on(selectFolder, (state, { folder }) => (
        {
            ...state,
            selectedFolder: folder,
        }
    )),
    on(selectSubFolder, (state, { subFolder }) => (
        {
            ...state,
            breadcrumbs: [...state.breadcrumbs, subFolder],
        }
    )),
    on(selectBreadcrumbsItem, (state, { item }) => {
        const index = state.breadcrumbs.findIndex(b => b.path === item.path);
        return {
            ...state,
            breadcrumbs: state.breadcrumbs.slice(0, index + 1),
            selectedPath: item.path,
        };
    }),
    on(clearBreadcrumbs, (state) => (
        {
            ...state,
            breadcrumbs: [],
        }
    )),
    on(fileAdded, (state, { file }) => (
        {
            ...state,
            files: [...state.files, file],
        }
    )),
);
