import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import * as api from './apiService';

interface PageSize {
    value: number;
    label: string;
}

interface Task {
    id: number;
    url: string;
    originalUrl: string | null;
    totalWords: number;
    textTranslationStatus: string;
    fileTranslationStatus: string;
    percentageFileTranslated: number;
    percentageTextTranslated: number;
    assignedContractor: string | null;
    assignedContractorProofer: string | null;
    assignedInternalReviewer: string | null;
    assignedInternalReviewerInitials: string | null;
    assignedTranslator: string | null;
    assignedTranslatorInitials: string | null;
    assignedDate: string | null;
    contenType: string;
    lastUpdateDate: string | null;
    lastUpdateDateShort: string | null;
    priority: string | null;
    projectCode: string | null;
    queueTypeFlagText: string | null;
    queuedBy: string | null;
    receiptDate: string | null;
    receiptDateShort: string | null;
    requestedBy: string | null;
    errorPageReviewed: false;
    errorPageVendor: false;
    hasTMSContent: false;
    autoParsed: boolean;
    assignmentReady: boolean;
    errorPage: boolean;
    markedForMT: boolean;
    mpactionId: boolean;
    onHold: boolean;
    overduePage: boolean;
    pageRejected: boolean;
    pendingDeletion: boolean;
    pendingReview: boolean;
    seoPage: boolean;
    specialEdit: boolean;
    underReview: boolean;
    webCATTParsed: boolean;
    queueSync: boolean;
    savedByContent: boolean;
    isExpanded?: boolean;
}

interface TaskList extends Array<Task>{}

interface ResponseData {
    totalTasks: number;
    tasks: TaskList;
}

interface AxiosResponse {
    data: ResponseData
}

interface TasksState {
    tasks: TaskList;
    totalTasks: number;
    activePage: number;
    pageSize: PageSize;
    loading: boolean;
    //to be used when you want to prevent other actions while loading
    actionLoading: boolean; 
    selectedTasks: TaskList;
} 

const initialState: TasksState = {
    tasks: [],
    totalTasks: 0,
    activePage: 1,
    pageSize: { value: 100, label: 'Show 100' },
    loading: false,
    actionLoading: false,
    selectedTasks: []
}

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',

    async (_, thunkAPI) => {

        const { search, tasks } : any = thunkAPI.getState();

        const request: any = {
            assignmentStatusIdSelected: search.selectedAssignmentStatus.value,
            translationStatusIdSelected: search.selectedStatus.value,
            contentTypeIdSelected: search.selectedContentType.value,
            translationTypeIdSelected: search.selectedTranslationType.value,
            pendingDeletionIdSelected: search.selectedPendingDeletionStatus.value,
            selectedTaskIds: search.selectedIds,
            selectedTaskUrlsPattern: search.selectedTaskUrlsPattern,
            excludeUrls: search.excludeUrls,
            seoMode: false, //TODO: YOu need to add this filter to the search. TM-6318
            pageSize: tasks.pageSize.value,
            activePage: tasks.activePage
        }

        if (search.startQueueDate) {
            request.queueStartDate = new Date(search.startQueueDate);
        }

        if (search.endQueueDate) {
            request.queueEndDate = new Date(search.endQueueDate);
        }

        const { data } : AxiosResponse = await api.fetchTasks(request);
      
        return data;
    }
)


export const TasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setSelectedTasks: (state, action:PayloadAction<TaskList>) => {
            state.selectedTasks = action.payload;
        },
        addSelectedTask: (state, action:PayloadAction<Task>) => {
            state.selectedTasks.push(action.payload);
        },
        removeSelectedTask: (state, action:PayloadAction<Task>) => {
            const index = state.selectedTasks.findIndex(t => action.payload.id === t.id);
            state.selectedTasks.splice(index, 1);
        },
        expandTask: (state, action:PayloadAction<Task>) => {
            let taskList = [...state.tasks];
            taskList = taskList.map(t => {
                if (t.id === action.payload.id) {
                    t.isExpanded = true;
                } else {
                    t.isExpanded = false;
                }

                return t;
            });

            state.tasks = taskList;
        },
        closeTask: (state, action:PayloadAction<Task>) => {
            let taskList = [...state.tasks];
            taskList = taskList.map(t => {
                if (t.id === action.payload.id) {
                    t.isExpanded = false;
                } 

                return t;
            });

            state.tasks = taskList;
        },
        setPageSize: (state, action:PayloadAction<PageSize>) => {
            state.pageSize = action.payload;
        },
        setActivePage: (state, action:PayloadAction<number>) => {
            state.activePage = action.payload;
        },
        setActionLoading: (state, action:PayloadAction<boolean>) => {
            state.actionLoading = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.tasks = [];
            state.selectedTasks = [];
            state.totalTasks = 0;
            state.loading = true;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload.tasks;
            state.totalTasks = action.payload.totalTasks;
            state.selectedTasks = [];
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.tasks = [];
            state.selectedTasks = [];
            state.totalTasks = 0;
            state.loading = false;
            //TODO: set error message. You don't want to show a toast for this error. Is better to show an actual static error message so that the user can see what is wrong
            //take a screenshot and send it to the support team.
        })
    }
});

export const { 
    setSelectedTasks,
    addSelectedTask,
    removeSelectedTask,
    expandTask,
    closeTask,
    setPageSize,
    setActivePage,
    setActionLoading
} = TasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectTotalTasks = (state: RootState) => state.tasks.totalTasks;
export const selectActivePage = (state: RootState) => state.tasks.activePage;
export const selectPageSize = (state: RootState) => state.tasks.pageSize;
export const selectLoading = (state: RootState) => state.tasks.loading;
export const selectActionLoading = (state: RootState) => state.tasks.actionLoading;
export const selectSelectedTasks = (state: RootState) => state.tasks.selectedTasks;

export default TasksSlice.reducer;