import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../app/store";

interface SettingsState {
    selectedRelativeTime: boolean;
    selectedCompactRows: boolean;
    selectedIncludeUrls: boolean;
    selectedSidebarOpen: boolean; 
    selectedIncludeFiles: boolean;
}

const initialState: SettingsState = {
    selectedRelativeTime: true,
    selectedCompactRows: true,
    selectedIncludeUrls: false,
    selectedSidebarOpen: true,    //when true the sidebar is open on page load
    selectedIncludeFiles: false
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        handleRelativeTimeChange: (state, action: PayloadAction<boolean>) => {
            state.selectedRelativeTime = action.payload;
        },
        handleFatRowChange: (state, action: PayloadAction<boolean>) => {
            state.selectedCompactRows = action.payload;
        },
        handleIncludeUrlsChange: (state, action: PayloadAction<boolean>) => {
            state.selectedIncludeUrls = action.payload;
        },
        handleSidebarOpenChange: (state, action: PayloadAction<boolean>) => {
            state.selectedSidebarOpen = action.payload;
        },
        handleIncludeFilesChange: (state, action: PayloadAction<boolean>) => {
            state.selectedIncludeFiles = action.payload;
        }
    }
});

export const { handleRelativeTimeChange, handleFatRowChange,
             handleIncludeUrlsChange, handleSidebarOpenChange,
             handleIncludeFilesChange } = settingsSlice.actions;

export const selectRelativeTime = (state: RootState) => state.settings.selectedRelativeTime;

export const selectCompactRows = (state: RootState) => state.settings.selectedCompactRows;

export const selectIncludeUrls = (state: RootState) => state.settings.selectedIncludeUrls;

export const selectSidebarOpen = (state: RootState) => state.settings.selectedSidebarOpen;

export const selectIncludeFiles = (state: RootState) => state.settings.selectedIncludeFiles;

export default settingsSlice.reducer;
