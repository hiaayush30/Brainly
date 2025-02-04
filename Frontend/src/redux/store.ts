import { configureStore } from '@reduxjs/toolkit'
import  serviceSlice  from './features/service/serviceSlice'
import  contentSlice  from './features/content/contentSlice'
import  collectionSlice  from './features/collection/collectionSlice'

export const store = configureStore({
  reducer: {
    service:serviceSlice, //service is the name against which the services object will be stored in Redux
    content:contentSlice,
    collection:collectionSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch