import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../../../app/store';

export enum Tab {
    Search = "search",
    Lsp = "lsp",
    Users = "users",
    PreferredSearch = "preferred",
    Settings = "settings"
}

interface SideBarState {
    activeTab: Tab
}

const initialState: SideBarState = {
    activeTab: Tab.Search
}

export const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        setActiveTab: (state, action:PayloadAction<Tab>) => {
            state.activeTab = action.payload;
        }
    }
});

export const { setActiveTab } = sideBarSlice.actions;

export const selectActiveTab = (state: RootState) => state.sideBar.activeTab;

export default sideBarSlice.reducer;