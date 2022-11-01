import { createSlice } from '@reduxjs/toolkit';

const shoppingCartSlice = createSlice({
  name: 'selectedSubservices',
  initialState: {
    selectedSubservices: [],
    totalForbiddenSubservicesIDs: [],
  },
  reducers: {
    addSubserviceToCart(state, action) {
      if (state.selectedSubservices.length < process.env.REACT_APP_SHOPPING_CART_LIMIT) {
        const { subservice } = action.payload;

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
    },
  },
});

export const {
  addSubserviceToCart, removeSubserviceFromCart,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
