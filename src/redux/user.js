import { createSlice } from "@reduxjs/toolkit";

// Intial State
const initiaState = {
	login: false,
	user: null,
};

// Store for User (Data, Actions)

const userSlice = createSlice({
	name: "user",
	initialState: initiaState,
	reducers: {
		// Login Action
		login: (state, payload) => {
			state.login = true;
			state.user = payload;
		},
		// Logout Action
		logout: (state) => {
			state.login = false;
			state.user = null;
		},
	},
});

// Export Actions
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
