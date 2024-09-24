import { createAction, props } from '@ngrx/store';
import { FileDetails } from '../models/file-details';
import { FolderPath } from '../models/folder-path';

export const LOAD_FILES = 'LOAD_FILES';
export const LOAD_FILES_SUCCESS = 'LOAD_FILES_SUCCESS';
export const RESET_FILES = 'RESET_FILES';
export const LOAD_FOLDERS = 'LOAD_FOLDERS';
export const LOAD_FOLDERS_SUCCESS = 'LOAD_FOLDERS_SUCCESS';
export const SELECT_FOLDER = 'SELECT_FOLDER';
export const RESET_FOLDERS = 'RESET_FOLDERS';
export const SELECT_SUB_FOLDER = 'ADD_BREADCRUMBS_ITEM';
export const SELECT_BREADCRUMBS_ITEM = 'SELECT_BREADCRUMBS_ITEM';
export const CLEAR_BREADCRUMBS = 'CLEAR_BREADCRUMBS';
export const HTTP_ERROR_OCCURRED = 'HTTP_ERROR_OCCURRED';

export const FILE_ADDED = 'ADD_FILE';

export const loadFiles = createAction(
    LOAD_FILES,
    props<{ path: string }>()
);

export const loadFilesSuccess = createAction(
    LOAD_FILES_SUCCESS,
    props<{ files: FileDetails[] }>()
);

export const resetFiles = createAction(
    RESET_FILES
);

export const loadFolders = createAction(
    LOAD_FOLDERS
);

export const loadFoldersSuccess = createAction(
    LOAD_FOLDERS_SUCCESS,
    props<{ folders: FolderPath[] }>()
);

export const selectFolder = createAction(
    SELECT_FOLDER,
    props<{ folder: FolderPath }>()
);

export const selectSubFolder = createAction(
    SELECT_SUB_FOLDER,
    props<{ subFolder: FileDetails }>()
);

export const selectBreadcrumbsItem = createAction(
    SELECT_BREADCRUMBS_ITEM,
    props<{ item: FileDetails }>()
);

export const clearBreadcrumbs = createAction(
    CLEAR_BREADCRUMBS
);

export const fileAdded = createAction(
    FILE_ADDED,
    props<{ file: FileDetails }>()
);

export const httpErrorOccurred = createAction(
    HTTP_ERROR_OCCURRED,
    props<{ error: string }>()
);

export const resetFolders = createAction(
    RESET_FOLDERS
);
