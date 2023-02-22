import { combineReducers,configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import alertsSlice from "./alertsSlice";
import companySlice from "./companySlice";
const rootReducer = combineReducers({
    user:userSlice,
    alerts:alertsSlice,
    company:companySlice
})

const store= configureStore({
    reducer:rootReducer
});

export default store;