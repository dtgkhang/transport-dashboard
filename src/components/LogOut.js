import React from 'react'
import { useNavigate } from 'react-router-dom';
const LogOut=()=>{
    const navigate = useNavigate()
    localStorage.clear();

        //check something in local storage so you can know
        // if you should reload or not

        // window.location.reload(false);
        navigate("/login")


}

export default LogOut