import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import * as api from './apiService';

interface PageSize {
    value: number;
    label: string;
}

interface Task {
    id: number;
    translationStatus: string;
    isExpanded?: boolean
}

interface TaskList extends Array<Task>{}

interface TasksState {
    tasks: TaskList;
    totalTasks: number;
    activePage: number;
    pageSize: PageSize;
    loading: boolean;
    selectedTasks: TaskList;
} 

const initialState: TasksState = {
    tasks: [],
    totalTasks: 0,
    activePage: 1,
    pageSize: { value: 100, label: 'Show 100' },
    loading: false,
    selectedTasks: []
}

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (requestObject: any, thunkAPI) => {
      const response = await api.fetchTasks(requestObject);
      console.log(response.data);
      return response.data;
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
        }
        

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.tasks = [];
            state.totalTasks = 0;
            state.loading = true;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload.tasks;
            state.totalTasks = action.payload.totalTasks;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.tasks = [];
            state.totalTasks = 0;
            state.loading = false;
            //set error message. You don't want to show a toast for this error. Is better to show an actual static error message.
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
    setActivePage
} = TasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectTotalTasks = (state: RootState) => state.tasks.totalTasks;
export const selectActivePage = (state: RootState) => state.tasks.activePage;
export const selectPageSize = (state: RootState) => state.tasks.pageSize;
export const selectLoading = (state: RootState) => state.tasks.loading;
export const selectSelectedTasks = (state: RootState) => state.tasks.selectedTasks;

export default TasksSlice.reducer;