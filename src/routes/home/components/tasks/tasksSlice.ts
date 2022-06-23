import { createSlice, PayloadAction, current, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import { data } from './tasks-data';
import * as api from './apiService';

interface Task {
    id: number;
    translationStatus: string;
    isExpanded?: boolean
}

interface TaskList extends Array<Task>{}

interface TasksState {
    tasks: TaskList;
    loading: boolean;
    selectedTasks: TaskList;
} 

const initialState: TasksState = {
    tasks: data,
    loading: false,
    selectedTasks: []
}

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (requestObject: any, thunkAPI) => {
      const response = await api.fetchTasks(requestObject);
      console.log(response.data);
      return response.data.content;
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.tasks = [];
            state.loading = true;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.tasks = [];
            state.loading = false;
        })
    }
});

export const { setSelectedTasks, addSelectedTask, removeSelectedTask, expandTask, closeTask } = TasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectLoading = (state: RootState) => state.tasks.loading;

export const selectSelectedTasks = (state: RootState) => state.tasks.selectedTasks;

export default TasksSlice.reducer;