// /* eslint-disable no-param-reassign */
// import {createSlice} from "@reduxjs/toolkit";

// // ------------------------------------
// // Constants
// // ------------------------------------

// const initialState = {
//   checked: false,
//   loggedIn: false,
//   me: {},
// };

// // ------------------------------------
// // Slice
// // ------------------------------------

// const authSlice = createSlice({
//   name: "app",
//   initialState,
//   reducers: {
//     authenticate: (state, {payload}) => {
//       state.loggedIn = payload.loggedIn;
//       state.checked = payload.checked;
//     },
//     saveMe: (state, {payload}) => {
//       state.me = payload.me;
//     },
//   },
// });

// export const {action} = authSlice;
// export const {authenticate, saveMe} = authSlice.actions;

// export default authSlice.reducer;
