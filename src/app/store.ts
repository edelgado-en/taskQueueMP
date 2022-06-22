import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import sidebarReducer from '../routes/home/components/sidebar/sideBarSlice';
import tasksReducer from '../routes/home/components/tasks/tasksSlice';
import searchReducer from '../routes/home/components/sidebar/expanded/search/searchSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sideBar: sidebarReducer,
    tasks: tasksReducer,
    search: searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
