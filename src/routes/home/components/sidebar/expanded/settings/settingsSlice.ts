import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../app/store";

interface SettingsState {
    selectedRelativeTime: boolean 
}

const initialState: SettingsState = {
    selectedRelativeTime: true
}


export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        handleRelativeTimeChange: (state, action: PayloadAction<boolean>) => {
            state.selectedRelativeTime = action.payload;
        }
    }
});


export const { handleRelativeTimeChange } = settingsSlice.actions;

export const selectRelativeTime = (state: RootState) => state.settings.selectedRelativeTime;

export default settingsSlice.reducer;
