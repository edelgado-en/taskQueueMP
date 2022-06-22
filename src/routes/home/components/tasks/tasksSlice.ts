import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import { data } from './tasks-data';

interface Task {
    id: number;
    translationStatus: string;
    isExpanded?: boolean
}

interface TaskList extends Array<Task>{}

interface TasksState {
    tasks: TaskList
    selectedTasks: TaskList
} 

const initialState: TasksState = {
    tasks: data,
    selectedTasks: []
}

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
    }
});

export const { setSelectedTasks, addSelectedTask, removeSelectedTask, expandTask, closeTask } = TasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectSelectedTasks = (state: RootState) => state.tasks.selectedTasks;

export default TasksSlice.reducer;