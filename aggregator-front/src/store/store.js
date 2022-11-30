import { configureStore } from '@reduxjs/toolkit';
import OrdersInfoReducer from './OrdersInfoSlice';
import headerReducer from './HeaderSlice';
import AdminEntitiesReducer from './AdminEntitiesSlice';
import UserInfoReducer from './UserInfoSlice';

export default configureStore({
  reducer: {
    ordersInfo: OrdersInfoReducer,
    header: headerReducer,
    adminEntities: AdminEntitiesReducer,
    users: UserInfoReducer,
  },
});
