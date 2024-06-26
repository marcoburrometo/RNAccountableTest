import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {coinDetailsApi} from './api/coinDetailsApi';
import {coinListApi} from './api/coinListApi';
import {userDataSlice} from './slices/userData';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['coinListApi', 'coinDetailsApi', 'userDataSlice'],
};

const rootReducer = combineReducers({
  [coinListApi.reducerPath]: coinListApi.reducer,
  [coinDetailsApi.reducerPath]: coinDetailsApi.reducer,
  [userDataSlice.reducerPath]: userDataSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(coinListApi.middleware)
      .concat(coinDetailsApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
