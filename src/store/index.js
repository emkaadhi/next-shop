import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/UserSlice'
import profileReducer from './profile/profileSlice'
import categoryReducer from './category/CategorySlice'
import productReducer from './product/ProductSlice'
import cartReducer from './cart/CartSlice'
import orderReducer from './order/OrderSlice'

export const store = configureStore({
    reducer: {
        user:userReducer,
        profile:profileReducer,
        category:categoryReducer,
        product:productReducer,
        cart:cartReducer,
        order:orderReducer
    }, middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


