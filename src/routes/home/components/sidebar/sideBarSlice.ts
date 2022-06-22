import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../../../app/store';

export enum Tab {
    Search = "search",
    Lsp = "lsp",
    USers = "users",
    PreferredSearch = "preferred"
}

interface SideBarState {
    isExpanded: boolean
    activeTab: Tab
}

const initialState: SideBarState = {
    isExpanded: false,
    activeTab: Tab.Search
}

export const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        toggleExpanded: (state) => {
            state.isExpanded = !state.isExpanded;
        },
        setActiveTab: (state, action:PayloadAction<Tab>) => {
            state.activeTab = action.payload;
        }
    }
});

export const { toggleExpanded, setActiveTab } = sideBarSlice.actions;

export const selectIsExpanded = (state: RootState) => state.sideBar.isExpanded;
export const selectActiveTab = (state: RootState) => state.sideBar.activeTab;

export default sideBarSlice.reducer;