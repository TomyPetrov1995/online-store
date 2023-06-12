import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const getOneProduct = createAsyncThunk("product/getOneProduct",
    async (id,thunkAPI) => {
        try {
            const {data} =await axios.get(`/products/${id}`);
            return data
        }catch (e){
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    }
)
const categorySlice = createSlice({
    name : "product",
    initialState : {
        product:null,
        isLoading:false,
        status : null
    },
    extraReducers :(builder) => {
        //GET ONE PRODUCT
        builder.addCase(getOneProduct.pending,(state) => {state.isLoading = true})
        builder.addCase(getOneProduct.fulfilled,(state, {payload}) => {state.isLoading = false;state.product = payload.product});
        builder.addCase(getOneProduct.rejected,(state, {payload}) => {state.status = payload?.message});
    }
});

export default categorySlice.reducer;