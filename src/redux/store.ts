import { configureStore } from '@reduxjs/toolkit';
import sliceUsers from './sliceUsers';

const store = configureStore({
    reducer: {
      users: sliceUsers,
    }
});

export default store;
