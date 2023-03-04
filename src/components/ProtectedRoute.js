import axios from 'axios';
import React ,{useEffect,useState}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom'
import { SetUser } from '../redux/userSlice';
import userApi from '../api/userApi'
import {HideLoading, ShowLoading} from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";
function ProtectedRoute({children}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user}= useSelector(state => state.user);
    const {loading} = useSelector((state)=>state.alerts)
    const validateToken=async ()=>{
        try{
            dispatch(ShowLoading());
            const response = await userApi.getUser(localStorage.getItem("userID"))
            console.log(response)
            dispatch(HideLoading());
            if(response.data.data.id){
                dispatch(ShowLoading());

                dispatch(SetUser(response.data.data))
                dispatch(HideLoading());

                console.log(response)
            }else{
                // localStorage.clear();
                navigate('/login')

            }
        }catch(error){

            // localStorage.clear();
            navigate('/login')
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('userID')){
            validateToken();
            console.log(user)


        }else{
            navigate('/login')
        }
    },[])
    return (
        <div>
            { !loading && <DefaultLayout>{children}</DefaultLayout>}
        </div>
    )
}

export default ProtectedRoute