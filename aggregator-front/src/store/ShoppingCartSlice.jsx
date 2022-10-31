/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const shoppingCartSlice = createSlice({
  name: 'selectedSubservices',
  initialState: {
    selectedSubservices: [],
  },
  reducers: {
    addSubserviceToCart(state, action) {
      state.selectedSubservices.push(action.payload.subservice);
      console.log(state.selectedSubservices);
    },
    removeSubserviceFromCart(state, action) { },
  },
});

export const { addSubserviceToCart, removeSubserviceFromCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
