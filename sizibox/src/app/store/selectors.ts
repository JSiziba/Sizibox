import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SiziboxState } from './store';

export const selectSiziboxData = createFeatureSelector<SiziboxState>('siziboxStore');

export const selectFiles = createSelector(
    selectSiziboxData,
    (state: SiziboxState) => state.files
);

export const selectFolders = createSelector(
    selectSiziboxData,
    (state: SiziboxState) => state.folders
);

export const selectBreadcrumbs = createSelector(
    selectSiziboxData,
    (state: SiziboxState) => state.breadcrumbs
);

export const selectSelectedPath = createSelector(
    selectSiziboxData,
    (state: SiziboxState) => state.selectedFolder
);

export const selectError = createSelector(
    selectSiziboxData,
    (state: SiziboxState) => state.error
);

export const selectFilesLoading = createSelector(
    selectSiziboxData,
    (state: SiziboxState) => state.filesLoading
);

export const selectFoldersLoading = createSelector(
    selectSiziboxData,
    (state: SiziboxState) => state.foldersLoading
);
