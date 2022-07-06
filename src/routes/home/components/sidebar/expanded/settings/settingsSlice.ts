import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../app/store";

interface SettingsState {
    selectedRelativeTime: boolean;
    selectedCompactRows: boolean;
    selectedIncludeUrls: boolean; 
}

const initialState: SettingsState = {
    selectedRelativeTime: true,
    selectedCompactRows: true,
    selectedIncludeUrls: false
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
        }
    }
});


export const { handleRelativeTimeChange, handleFatRowChange, handleIncludeUrlsChange } = settingsSlice.actions;

export const selectRelativeTime = (state: RootState) => state.settings.selectedRelativeTime;

export const selectCompactRows = (state: RootState) => state.settings.selectedCompactRows;

export const selectIncludeUrls = (state: RootState) => state.settings.selectedIncludeUrls;

export default settingsSlice.reducer;
