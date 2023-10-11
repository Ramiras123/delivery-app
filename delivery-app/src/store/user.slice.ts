import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios from 'axios';
import { PREFIX } from '../helpers/API';
import { act } from 'react-dom/test-utils';
import { LoginResponse } from '../interfaces/auth.interface';

export const JWT_PERSISTENT_STATE = 'userData';
export interface UserState {
	jwt: string | null;
	loginState: null | 'rejected';
}

export interface UserPersistState {
	jwt: string | null;
}

const initialState: UserState = {
	jwt: loadState<UserPersistState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
	loginState: null
};

export const login = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }) => {
		const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
			email: params.email,
			password: params.password
		});
		return data;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<LoginResponse>) => {
				state.jwt = action.payload.access_token;
			}
		);
		builder.addCase(login.rejected, (state, error) => {
			console.log(error);
		});
	}
});

export default userSlice.reducer;
export const userAction = userSlice.actions;
