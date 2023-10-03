import { configureStore } from "@reduxjs/toolkit";
import userSLice from "./features/users/userSlice";
import { api } from "./api/apiSlice";
import notificationSLice from "./notification/notificationSlice";
import WishlistSlice from "./features/whislist/whislistSlice";
import readedBookSlice from "./features/readedBook/readedBookSlice";

const store = configureStore({
  reducer: {
    user: userSLice,
    notification: notificationSLice,
    wishlist: WishlistSlice,
    readBook: readedBookSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
