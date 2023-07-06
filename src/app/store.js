import { configureStore } from '@reduxjs/toolkit';
import pegawaiReducer from '../features/pegawaiSlice'

export default configureStore({
  reducer: {
    pegawai: pegawaiReducer
  },
});
