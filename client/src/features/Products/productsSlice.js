import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const getAllProducts = createAsyncThunk("products/getAllProducts",
    async (_,thunkAPI) => {
    try {
        const {data} =await axios.get("/products");
        return data
    }catch (e){
        console.log(e);
        thunkAPI.rejectWithValue(e)
    }
    }
)

const categorySlice = createSlice({
    name : "products",
    initialState : {
        productList :[],
        product:null,
        isLoading:false,
        status : null
    },
    extraReducers :(builder) => {
        //GET ALL PRODUCTS
        builder.addCase(getAllProducts.pending,(state) => {state.isLoading = true})
        builder.addCase(getAllProducts.fulfilled,(state, {payload}) => {state.isLoading = false;state.productList = payload.products});
        builder.addCase(getAllProducts.rejected,(state, {payload}) => {state.status = payload?.message});
    }
});

export default categorySlice.reducer;