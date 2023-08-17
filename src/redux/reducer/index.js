import { combineReducers } from "@reduxjs/toolkit";
import oracleSlice from './oracleSlice';

const rootReducer = combineReducers({ 
    oracle: oracleSlice
});

export default rootReducer;