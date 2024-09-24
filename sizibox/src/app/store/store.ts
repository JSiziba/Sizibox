import { FileDetails } from '../models/file-details';
import { FolderPath } from '../models/folder-path';

export interface SiziboxState {
    files: FileDetails[];
    folders: FolderPath[];
    breadcrumbs: FileDetails[];
    selectedFolder: FolderPath | null;
    error: string | null;
    filesLoading: boolean;
    foldersLoading: boolean;
}

export const initialSiziboxState: SiziboxState = {
    files: [],
    folders: [],
    breadcrumbs: [],
    selectedFolder: null,
    error: null,
    filesLoading: false,
    foldersLoading: false,
};
