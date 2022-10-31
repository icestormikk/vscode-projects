import { configureStore } from '@reduxjs/toolkit';
import shopingCartReducer from './ShoppingCartSlice';

export default configureStore({
  reducer: {
    shoppingCart: shopingCartReducer,
  },
});
