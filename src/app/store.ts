import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../routes/home/components/sidebar/sideBarSlice';
import tasksReducer from '../routes/home/components/tasks/tasksSlice';
import searchReducer from '../routes/home/components/sidebar/expanded/search/searchSlice';
import settingsReducer from '../routes/home/components/sidebar/expanded/settings/settingsSlice';
import preferredSearchReducer from '../routes/home/components/sidebar/expanded/preferredSearches/preferredSearchSlice';

export const store = configureStore({
  reducer: {
    sideBar: sidebarReducer,
    tasks: tasksReducer,
    search: searchReducer,
    settings: settingsReducer,
    preferredSearch: preferredSearchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
