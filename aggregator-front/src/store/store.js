import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer from './ShoppingCartSlice';
import headerReducer from './HeaderSlice';

export default configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    header: headerReducer,
  },
});
