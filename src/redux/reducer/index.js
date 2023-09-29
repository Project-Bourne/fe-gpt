import { combineReducers } from "@reduxjs/toolkit";
import oracleSlice from './oracleSlice';
import authSlice from './authReducer'

const rootReducer = combineReducers({ 
    oracle: oracleSlice,
    auth: authSlice
});

export default rootReducer;