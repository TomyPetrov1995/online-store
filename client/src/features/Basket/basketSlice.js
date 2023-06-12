import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../utils/axios";


//ADD PRODUCT TO BASKET
export const addProductToBasket = createAsyncThunk("basket/addProductToBasket",
    async (payload,thunkAPI) => {
    try {
        const {data} = await axios.post("/basket",payload);
        return data
    }catch (e) {
        console.log(e);
        thunkAPI.rejectWithValue(e)
    }
    })

//GET ALL PRODUCTS TO BASKET
export const getAllBasketProduct = createAsyncThunk("basket/getAllBasketProduct",
    async (_,thunkAPI) => {
        try {
            const {data} = await axios.get("/basket");

            return data
        }catch (e) {
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    });

export const changeQuantityBasketProduct = createAsyncThunk("basket/changeQuantityBasketProduct",
    async (payload,thunkAPI) => {
        try {
            const {data} = await axios.put("/basket",payload);
            return data;
        }catch (e) {
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    });

export const deleteBasketDevice = createAsyncThunk("basket/deleteBasketDevice",
    async (id,thunkAPI) => {
        try {
            const {data} = await axios.delete(`/basket/${id}`);
            console.log(data)
            return data
        }catch (e) {
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    })

const basketSlice = createSlice({
    name : "basket",
    initialState : {
        basketList :[],
        basketProduct :null,
        currentBasketDevice : null,
        isLoading:false,
        status :null,
        quantity:1
    },
    extraReducers : (builder) => {
        //ADD DEVICE TO BASKET
        builder.addCase(addProductToBasket.pending,(state,{payload}) => {
            state.isLoading = true
        });
        builder.addCase(addProductToBasket.fulfilled,(state,{payload}) => {
            state.isLoading = false;
            state.basketProduct = payload?.basketDevice;
            state.currentBasketDevice = payload?.currentBasketDevice;
            state.status = payload?.message
        });
        builder.addCase(addProductToBasket.rejected,(state,{payload}) => state.status = payload?.message)

        //GET ALL BASKET DEVICES
        builder.addCase(getAllBasketProduct.pending,(state,{payload}) => {
            state.isLoading = true
        });
        builder.addCase(getAllBasketProduct.fulfilled,(state,{payload}) => {
            state.isLoading = false;
            state.basketList = payload?.basketDevices
        });
        builder.addCase(getAllBasketProduct.rejected,(state,{payload}) => {
            state.status = payload?.message
        })

        //UPDATE QUANTITY
        builder.addCase(changeQuantityBasketProduct.pending,(state,{payload}) => {
            state.isLoading = true
        });
        builder.addCase(changeQuantityBasketProduct.fulfilled,(state,{payload}) => {
            state.basketList = payload?.products
        });
        builder.addCase(changeQuantityBasketProduct.rejected,(state,{payload}) => {
            state.status = payload?.message
        });

        //DELETE BASKET DEVICE
        builder.addCase(deleteBasketDevice.pending,(state) => {
            state.isLoading = true
        });
        builder.addCase(deleteBasketDevice.fulfilled,(state,{payload}) => {
            state.isLoading = false;
            state.basketList = payload?.basketDevices
        });
        builder.addCase(deleteBasketDevice.rejected,(state,{payload}) => {
            state.status = payload?.message
        });

    }
});

export default basketSlice.reducer