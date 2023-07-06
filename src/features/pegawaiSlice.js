import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'axios';

export const getAllPegawai = createAsyncThunk('pegawai/getAllPegawai', async() => {
    const response = await axios.get('https://61601920faa03600179fb8d2.mockapi.io/pegawai')
    return response.data
})



const pegawaiEntity = createEntityAdapter({
    selectId: (pegawai) => pegawai.id
})

const pegawaiSlice = createSlice({
    name: "pegawai ",
    initialState: pegawaiEntity.getInitialState(),
    extraReducers:{
        [getAllPegawai.fulfilled] : (state,action) => {
            pegawaiEntity.setAll(state, action.payload)
        },
    }
})

export const pegawaiSelectors = pegawaiEntity.getSelectors(state => state.pegawai)
export default pegawaiSlice.reducer