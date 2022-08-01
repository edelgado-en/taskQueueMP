import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../app/store";
import { statuses, assignmentStatuses, translationTypes,
    TATStatuses, flags, contentTypes,
    priorities, projectCodes, internalReviewers,
    requestedBy, pendingDeletionStatuses
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
    projectCodes: Array<DropdownOption>,
    selectedProjectCode: DropdownOption,
    internalReviewers: Array<DropdownOption>,
    selectedInternalReviewer: DropdownOption,
    requestedBy: Array<DropdownOption>,
    selectedRequestedBy: DropdownOption,
    pendingDeletionStatuses: Array<DropdownOption>,
    selectedPendingDeletionStatus: DropdownOption,
    startQueueDate: number | null, //save it as timestamp because Date objects are not serializable
    endQueueDate: number | null,
    seoMode: boolean,
    selectedIds: string, //this is a string because it can have the following formats: "1,2,3" or "1" or "1-" or "-10"
    selectedTaskUrlsPattern: string,
    excludeUrls: boolean
}

const initialState: SearchState = {
    statuses,
    assignmentStatuses,
    translationTypes,
    TATStatuses,
    flags,
    contentTypes,
    priorities,
    projectCodes,
    internalReviewers,
    requestedBy,
    selectedTranslationType: translationTypes[0],
    selectedStatus: statuses[0],
    selectedAssignmentStatus: assignmentStatuses[0],
    selectedTATStatus: TATStatuses[0],
    selectedContentType: contentTypes[0],
    selectedPriority: priorities[0],
    selectedProjectCode: projectCodes[0],
    selectedInternalReviewer: internalReviewers[0],
    selectedRequestedBy: requestedBy[0],
    pendingDeletionStatuses,
    selectedPendingDeletionStatus: pendingDeletionStatuses[1],
    selectedFlag: flags[0],
    startQueueDate: null,
    endQueueDate: null,
    seoMode: false,
    selectedIds: '',
    selectedTaskUrlsPattern: '',
    excludeUrls: false
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

        handleUpdateAssignmentStatuses: (state, action: PayloadAction<Array<DropdownOption>>) => {
            state.assignmentStatuses.push(...action.payload);
        },

        handleIdChange: (state, action: PayloadAction<string>) => {
            state.selectedIds = action.payload;
        },

        handleUrlsChange: (state, action: PayloadAction<string>) => {
            state.selectedTaskUrlsPattern = action.payload;
        },

        handleExcludeUrlsChange: (state, action: PayloadAction<boolean>) => {
            state.excludeUrls = action.payload;
        },

        resetAllFields: (state) => {
            return initialState;
        }
    }
})

export const { 
    handleDropdownChange,
    resetAllFields,
    handleStartDateChange,
    handleEndDateChange,
    handleUpdateAssignmentStatuses,
    handleIdChange,
    handleUrlsChange,
    handleExcludeUrlsChange

} = searchSlice.actions;

export const selectFilters = (state: RootState) => state.search;

export default searchSlice.reducer;
