import { configureStore } from '@reduxjs/toolkit';
import shopingCartReducer from './ShoppingCartSlice';
import headerReducer from './HeaderSlice';

export default configureStore({
  reducer: {
    shoppingCart: shopingCartReducer,
    header: headerReducer,
  },
});
