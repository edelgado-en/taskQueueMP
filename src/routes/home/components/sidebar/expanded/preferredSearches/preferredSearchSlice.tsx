import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../../../../../app/store";

interface PreferredSearchState {
    isModalOpen: boolean;
}

const initialState: PreferredSearchState = {
    isModalOpen: false
}

export const preferredSearchSlice = createSlice({
    name: 'preferredSearch',
    initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<boolean>) => {
            state.isModalOpen = action.payload;
        }
    }
});

export const { toggleModal } = preferredSearchSlice.actions;

export const selectIsModalOpen = (state: RootState) => state.preferredSearch.isModalOpen;

export default preferredSearchSlice.reducer;