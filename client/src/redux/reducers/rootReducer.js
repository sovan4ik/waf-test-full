import { combineReducers } from "redux";
import locationReducer from "./locationReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

export default combineReducers ({
    locationReducer: locationReducer,
    productReducer: productReducer,
    userReducer: userReducer
})