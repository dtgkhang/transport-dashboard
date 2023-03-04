import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {Layout, Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import axios from "axios";
import userApi from "../../api/userApi";

import {HideLoading, ShowLoading} from "../../redux/alertsSlice";
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {user}= useSelector(state => state.user);
    const {loading} = useSelector((state)=>state.alerts)


    const handleSubmit = async (values) => {
        try{
            dispatch(ShowLoading())
            const response = await axios.post("https://transport-springboot.herokuapp.com/api/auth/login",values)
            console.log(values)

            dispatch(HideLoading())

            if(response.data){
                message.success(response.data.message)
                localStorage.setItem("token",response.data.data.token)
                localStorage.setItem("userID",JSON.stringify(response.data.data.id))
                // localStorage.setItem("companyId",JSON.stringify(response.data.data.companyId))

                console.log(response.data.data.id)
                response.data.data.role=="ADMIN" ?  navigate("/admin") : navigate("/company")
                window.location.reload(false);

            }else{
                message.error("Login Fail!")
                console.log(response)
            }
        }catch(err){
            message.error(err.message)
            console.log(values)
        }


    };
    return (
        <div  footer={null} className="h-screen d-flex justify-content-center align-items-center mt-5" width={600} title="Login" >

            <div className="card w-500  p-5">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item  valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>

                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
