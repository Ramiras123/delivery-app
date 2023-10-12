import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CartItem {
	id: number;
	count: number;
}

export interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
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
