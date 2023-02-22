import { createSlice } from "@reduxjs/toolkit";
const companySlice = createSlice({
    name:"company",
    initialState:{
        company:null
    },
    reducers:{
        SetCompany:(state,action)=>{
            state.company = action.payload;
        }
    }
})
export const {SetCompany} = companySlice.actions;
export default companySlice.reducer;