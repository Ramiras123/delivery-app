import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { LoginResponse } from '../interfaces/auth.interface';
import { Profile } from './user.interface';
import { RootState } from './store';

export const JWT_PERSISTENT_STATE = 'userData';
export interface UserState {
	jwt: string | null;
	loginState?: string;
	profile?: Profile;
}

export interface UserPersistState {
	jwt: string | null;
}

const initialState: UserState = {
	jwt: loadState<UserPersistState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const login = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
			});
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error(error.response?.data.message);
			}
		}
	}
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
	'user/getProfile',
	async (_, thunkApi) => {
		const jwt = thunkApi.getState().user.jwt;
		const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
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
		},
		clearLogin: (state) => {
			state.loginState = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginState = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
	}
});

export default userSlice.reducer;
export const userAction = userSlice.actions;
