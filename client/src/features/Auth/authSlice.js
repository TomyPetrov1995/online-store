import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const registerUser = createAsyncThunk("auth/registerUser",
    async (payload,thunkAPI) => {
        try {
            const {data} = await axios.post("/auth/register",payload);
            if(data.token){
                window.localStorage.setItem("token",data.token)
            }
            return data
        }catch (e) {
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    })

export const login = createAsyncThunk("auth/login",
    async (payload,thunkAPI) => {
        try {
            const {data} = await axios.post("/auth/login",payload);
            if (data.token) {
                window.localStorage.setItem("token",data.token)
            }
            return data
        }catch (e) {
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    })
export const getMe = createAsyncThunk("auth/getMe",
    async (_,thunkAPI) => {
        try {
            const {data} = await axios.get("/auth/me");
            return data
        }catch (e){
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    });


export const updateUser = createAsyncThunk("auth/updateUser",
    async ({values,id},thunkAPI) => {
        try {

            const {data} = await axios.put(`/auth/me/${id}`,values,
                {headers :{
                        "Content-Type":"multipart/form-data"
                    }});
            return data
        }catch (e) {
            console.log(e);
            thunkAPI.rejectWithValue(e)
        }
    })
const authSlice = createSlice({
    name : "auth",
    initialState :{
        token :null,
        user : null,
        isLoading : false,
        status : null
    },
    reducers :{
        logOut :(state) => {
            state.token = null;
            state.user = null;
            state.isLoading = false;
            state.status = null;
        }
    },
    extraReducers :(builder) => {
        //REGISTER
        builder.addCase(registerUser.pending,(state) => {state.isLoading = true});
        builder.addCase(registerUser.fulfilled,(state,{payload}) => {state.isLoading = false;
            state.token = payload.token;state.status = payload.message;state.user = payload?.user});
        builder.addCase(registerUser.rejected,(state,{payload}) => {state.status = payload?.message});

        //LOGIN
        builder.addCase(login.pending,(state) => {state.isLoading = true});
        builder.addCase(login.fulfilled,(state,{payload}) => {state.isLoading = false;
            state.token = payload.token;state.status = payload?.message;state.user = payload?.user});
        builder.addCase(login.rejected,(state,{payload}) => {state.status = payload?.message});

        //GET ME
        builder.addCase(getMe.pending,(state, action) => {state.isLoading = true});
        builder.addCase(getMe.fulfilled,(state, {payload}) => {state.isLoading = true;
            state.token = payload?.token;state.user = payload?.user});
        builder.addCase(getMe.rejected,(state,{payload}) => state.message = payload?.message);

        //UPDATE USER
        builder.addCase(updateUser.pending,(state, action) => {state.isLoading = true});
        builder.addCase(updateUser.fulfilled,(state, {payload}) => {state.isLoading = true;
            state.user = payload?.user});
        builder.addCase(updateUser.rejected,(state,{payload}) => state.message = payload?.message)
    }

});

export const checkIsAuth = state => Boolean(state.auth.token)
export const {logOut} = authSlice.actions;
export default authSlice.reducer