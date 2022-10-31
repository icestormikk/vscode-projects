/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';

const shoppingCartSlice = createSlice({
  name: 'selectedSubservices',
  initialState: {
    selectedSubservices: [],
  },
  reducers: {
    addSubserviceToCart(state, action) {
      state.selectedSubservices.push(action.payload.subservice);
    },
    removeSubserviceFromCart(state, action) {
      const index = state.selectedSubservices.map(
        (elem) => elem.id,
      ).indexOf(action.payload.subserviceId);

      if (index > -1) { state.selectedSubservices.splice(index, 1); }
    },
  },
});

export const {
  addSubserviceToCart, removeSubserviceFromCart,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
