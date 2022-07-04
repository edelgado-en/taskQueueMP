import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../app/store";
import { statuses, assignmentStatuses, translationTypes,
     TATStatuses, flags, contentTypes,
      priorities, internalReviewers, requestedBy
} from './dropdown-data';

export interface DropdownOption {
    value: number,
    label: string
}

interface DropdownPayload {
    option: DropdownOption,
    name: string
}

interface SearchState {
    statuses: Array<DropdownOption>,
    selectedStatus: DropdownOption,
    assignmentStatuses: Array<DropdownOption>,
    selectedAssignmentStatus: DropdownOption,
    translationTypes: Array<DropdownOption>,
    selectedTranslationType: DropdownOption,
    TATStatuses: Array<DropdownOption>,
    selectedTATStatus: DropdownOption,
    flags: Array<DropdownOption>,
    selectedFlag: DropdownOption,
    contentTypes: Array<DropdownOption>
    selectedContentType: DropdownOption,
    priorities: Array<DropdownOption>
    selectedPriority: DropdownOption,
    internalReviewers: Array<DropdownOption>,
    selectedInternalReviewer: DropdownOption,
    requestedBy: Array<DropdownOption>,
    selectedRequestedBy: DropdownOption,
    startQueueDate: number | null, //save it as timestamp because Date object are not serializable
    endQueueDate: number | null,
    seoMode: boolean
}

const initialState: SearchState = {
    statuses,
    assignmentStatuses,
    translationTypes,
    TATStatuses,
    flags,
    contentTypes,
    priorities,
    internalReviewers,
    requestedBy,
    selectedTranslationType: translationTypes[0],
    selectedStatus: statuses[0],
    selectedAssignmentStatus: assignmentStatuses[0],
    selectedTATStatus: TATStatuses[0],
    selectedContentType: contentTypes[0],
    selectedPriority: priorities[0],
    selectedInternalReviewer: internalReviewers[0],
    selectedRequestedBy: requestedBy[0],
    selectedFlag: flags[0],
    startQueueDate: null,
    endQueueDate: null,
    seoMode: false
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        handleDropdownChange: (state, action: PayloadAction<DropdownPayload>) => {
            const { option, name } = action.payload;
            //workaround to make TS happy. to avoid having to check for key names. We are already checking
            //that name should be a string in DropdownPayload
            (state as any)[name] = option;
        },
        
        handleStartDateChange: (state, action: PayloadAction<number>) => {
            state.startQueueDate = action.payload;
        },

        handleEndDateChange: (state, action: PayloadAction<number>) => {
            state.endQueueDate = action.payload;
        },

        resetAllFields: (state) => {
            //state = initialState won't work because immer tracks mutations, and you are only doing one assignment
            return initialState;
        }
    }
})

export const { 
    handleDropdownChange,
    resetAllFields,
    handleStartDateChange,
    handleEndDateChange

} = searchSlice.actions;

export const selectFilters = (state: RootState) => state.search;

export default searchSlice.reducer;
