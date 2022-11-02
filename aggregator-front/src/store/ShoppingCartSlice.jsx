/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const shoppingCartSlice = createSlice({
  name: 'selectedSubservices',
  initialState: {
    isVisible: false,
    selectedSubservices: [],
    totalForbiddenSubservicesIDs: [],
  },
  reducers: {
    hide(state) {
      state.isVisible = false;
    },
    show(state) {
      state.isVisible = true;
    },
    addSubserviceToCart(state, action) {
      if (state.selectedSubservices.length < process.env.REACT_APP_SHOPPING_CART_LIMIT) {
        const { subservice } = action.payload;
        if (state.isVisible !== true) { state.isVisible = true; }

        if (!state.totalForbiddenSubservicesIDs.includes(subservice.id)) {
          state.selectedSubservices.push(subservice);

          subservice.incompatibleServicesIDs.forEach(
            (id) => {
              if (!state.totalForbiddenSubservicesIDs.includes(id)) {
                state.totalForbiddenSubservicesIDs.push(id);
              }
            },
          );
        }
      }
    },
    removeSubserviceFromCart(state, action) {
      const { subservice } = action.payload;
      const subserviceId = subservice.id;
      const index = state.selectedSubservices.map(
        (elem) => elem.id,
      ).indexOf(subserviceId);

      if (index > -1) { state.selectedSubservices.splice(index, 1); }

      action.payload.subservice.incompatibleServicesIDs.forEach((id) => {
        if (!state.selectedSubservices.map((elem) => elem.id).includes(subservice.id)) {
          state.totalForbiddenSubservicesIDs.pop(id);
        }
      });

      if (state.selectedSubservices.length === 0) { state.isVisible = false; }
    },
  },
});

export const {
  addSubserviceToCart, removeSubserviceFromCart, show, hide,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
