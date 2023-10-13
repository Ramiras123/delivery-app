import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const Cart_PERSISTENT_STATE = 'cartData';
export interface CartItem {
	id: number;
	count: number;
}

export interface CartState {
	items: CartItem[];
}

const initialState: CartState = loadState<CartState>(Cart_PERSISTENT_STATE) ?? {
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearItems: (state) => {
			state.items = [];
		},
		deleteItem: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
		},
		deleteCount: (state, action: PayloadAction<number>) => {
			const existed = state.items.find((item) => item.id === action.payload);
			if (!existed) {
				return;
			}
			if (existed) {
				if (existed.count === 1) {
					state.items = state.items.filter(
						(item) => item.id !== action.payload
					);
				} else {
					state.items.map((item) => {
						if (item.id === action.payload) {
							item.count--;
						}
						return item;
					});
				}
				return;
			}
		},
		add: (state, action: PayloadAction<number>) => {
			const existed = state.items.find((item) => {
				if (item.id === action.payload) {
					item.count++;
					return item;
				}
			});
			if (!existed) {
				state.items.push({ id: action.payload, count: 1 });
				return;
			}
			// state.items.map((item) => {
			// 	if (item.id === action.payload) {
			// 		item.count++;
			// 	}
			// 	return item;
			// });
		}
	}
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;
