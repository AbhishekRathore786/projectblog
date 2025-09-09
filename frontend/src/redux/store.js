    // import { combineReducers, configureStore } from '@reduxjs/toolkit'
    // import authSlice from "./authSlice.js"
    // import themeSlice from './themeSlice.js'
    // import blogSlice from './blogSlice.js'
    // import commentSlice from './commentSlice.js'
    // import {
    //     persistReducer,
    //     FLUSH,
    //     REHYDRATE,
    //     PAUSE,
    //     PERSIST,
    //     PURGE,
    //     REGISTER,
    // } from 'redux-persist'
    // import storage from 'redux-persist/lib/storage'
    // const persistConfig = {
    //     key: 'root',
    //     version: 1,
    //     storage,
    // }

    // const rootReducer = combineReducers({
    //     auth: authSlice,
    //     theme: themeSlice,
    //     blog:blogSlice,
    //     comment:commentSlice
    // })
 
    // const persistedReducer = persistReducer(persistConfig, rootReducer)

    // const store = configureStore({
    //     reducer: persistedReducer,
    //     middleware: (getDefaultMiddleware) =>
    //         getDefaultMiddleware({
    //             serializableCheck: {
    //                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //             },
    //         }),
    // })

    // export default store


    import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import themeSlice from './themeSlice.js';
import blogSlice from './blogSlice.js';
import commentSlice from './commentSlice.js';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// ✅ Add this persist config specifically for auth
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'], // Only persist user and token
};

// ✅ Wrap authSlice with persistReducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  theme: themeSlice,
  blog: blogSlice,
  comment: commentSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
