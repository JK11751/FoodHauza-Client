// /* eslint-disable no-param-reassign */
// import {createSlice} from "@reduxjs/toolkit";

// const initialState = {
//   origin: null,
//   destination: null,
//   travelTimeInfo: null,
// };

// export const navSlice = createSlice({
//   name: "nav",
//   initialState,
//   reducers: {
//     setOrigin: (state, action) => {
//       state.origin = action.payload;
//     },
//     setDestination: (state, action) => {
//       state.destination = action.payload;
//     },
//     setTravelTimeInfo: (state, action) => {
//       state.travelTimeInfo = action.payload;
//     },
//   },
// });

// // Exporting all actions
// export const {setOrigin, setDestination, setTravelTimeInfo} = navSlice.actions;

// // when we push info into the data layer (initial state) we need to pull it back...
// // selectors grab the updated info
// export const selectOrigin = (state) => state.nav.origin;
// export const selectDestination = (state) => state.nav.destination;
// export const selectTravelTimeInfo = (state) => state.nav.travelTimeInfo;

// export default navSlice.reducer;
