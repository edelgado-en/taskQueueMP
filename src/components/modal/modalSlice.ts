import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

/**
 * Types of modal windows we support.
 * 
 * @enum ModalType
 */
export enum ModalType {
    DeleteTasks = "delete",
    UpdateTaskStatistics = "update",
    PreferredSearch = "preferred",
    AssignTasks = "assign"
}

interface Modal {
    name: ModalType | undefined;
    isOpen: boolean;
}

interface ModalState {
    modal: Modal;
}

/**
 * The strategy used to handle modals is using an object with the name of the modal as key.
 * Only one modal window can be open at a time.
 * 
 * Example to open a modal: dispatch(setModal({ name: ModalType.DeleteTasks, isOpen: true}));
 * 
 */
const initialState: ModalState = {
    modal: {name: undefined, isOpen: false}
}

/**
 * The reason we have a slice for a modal open state is because we want to add an overlay to the sidebar when
 * any modal window is open to prevent the user from interacting with the page while the modal is open.
 */
export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<Modal>) => {
            state.modal = action.payload;
        }
    }
});

export const { setModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal.modal;

export const selectIsAnyModelOpen = (state: RootState) => state.modal.modal.isOpen;

export default modalSlice.reducer;

