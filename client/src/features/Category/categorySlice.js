import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import {getAllProducts} from ".././Products/productsSlice";

export const getAllCategories = createAsyncThunk("category/getAllCategories",
    async (_,thunkAPI) => {
    try {
        const {data} =await axios.get("/categories");
        return data
    }catch (e){
        console.log(e);
        thunkAPI.rejectWithValue(e)
    }
    }
);

export const getOneCategory = createAsyncThunk("category/getOneCategory",
    async (id,thunkAPI) => {
        try {
            const {data} =await axios.get(`/categories/${id}`);
            return data
        }catch (e){
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    }
);

const categorySlice = createSlice({
    name : "category",
    initialState : {
        categoryList :[],
        categoryListId:[],
        isLoading:false,
        category:{},
        status : null,
        id:null
    },
    extraReducers :(builder) => {
        //GET ALL CATEGORIES
        builder.addCase(getAllCategories.pending,(state, action) => {state.isLoading = true})
        builder.addCase(getAllCategories.fulfilled,(state, {payload}) => {state.isLoading = false;state.categoryList = payload.categories});
        builder.addCase(getAllCategories.rejected,(state, {payload}) => {state.status = payload?.message});

        //GET ONE CATEGORY
        //GET ALL CATEGORIES
        builder.addCase(getOneCategory.pending,(state, action) => {state.isLoading = true})
        builder.addCase(getOneCategory.fulfilled,(state, {payload}) => {state.isLoading = false;state.category = payload.category});
        builder.addCase(getOneCategory.rejected,(state, {payload}) => {state.status = payload?.message});
    }
});

export default categorySlice.reducer;