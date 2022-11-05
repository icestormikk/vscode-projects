import { configureStore } from '@reduxjs/toolkit';
import OrdersInfoReducer from './OrdersInfoSlice';
import headerReducer from './HeaderSlice';

export default configureStore({
  reducer: {
    ordersInfo: OrdersInfoReducer,
    header: headerReducer,
  },
});
