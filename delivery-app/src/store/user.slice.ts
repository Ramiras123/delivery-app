import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
	jwt: string | null;
}

const initialState: UserState = {
	jwt: null
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addJwt: (state) => {
			state.jwt = 'dasdasd';
		},
		logout: (state) => {
			state.jwt = null;
		}
	}
});

export default userSlice.reducer;
export const userAction = userSlice.actions;
