import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatcher = typeof store.dispatch;
 