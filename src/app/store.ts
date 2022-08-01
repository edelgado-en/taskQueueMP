import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../routes/home/components/sidebar/sideBarSlice';
import tasksReducer from '../routes/home/components/tasks/tasksSlice';
import formInfoReducer from '../routes/home/formInfoSlice';
import searchReducer from '../routes/home/components/sidebar/expanded/search/searchSlice';
import settingsReducer from '../routes/home/components/sidebar/expanded/settings/settingsSlice';
import modalReducer from '../components/modal/modalSlice';

export const store = configureStore({
  reducer: {
    sideBar: sidebarReducer,
    tasks: tasksReducer,
    search: searchReducer,
    settings: settingsReducer,
    modal: modalReducer,
    formInfo: formInfoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
