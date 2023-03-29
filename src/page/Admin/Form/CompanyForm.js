import React from 'react'
import {InputNumber,message,Input, Button, Radio, Form,Row, Modal, DatePicker} from 'antd'
import companyApi from "../../../api/companyApi";
import {useSelector} from "react-redux";
import {createRoutesFromChildren, useNavigate} from "react-router-dom";
import adminApi from "../../../api/adminApi";

function VehicleForm({isModalOpen,handleOk,handleCancel}) {
    const {user}= useSelector(state => state.user);
    const navigate =useNavigate();
    const handleSubmit = async (values) => {
        try {
            const response = await adminApi.createCompany(values)
            console.log(JSON.stringify(values))
            if (response) {
                message.success(response.data.message)
                // window.location.reload(false);

            } else {
                message.error("Add Fail!")
                console.log(response)
            }
        } catch (err) {
            message.error(err.response.data.message[0])
            console.log(err)
        }
    }

    return (
        <Modal width={600} title="Regis company" footer={null}  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form onFinish={handleSubmit}>

                <Form.Item label="avatarImage" name="avatarImage">
                    <Input />
                </Form.Item>
                <Form.Item label="companyName" name="companyName">
                    <Input />
                </Form.Item>
                <Form.Item label="username" name="username">
                    <Input />
                </Form.Item>
                <Form.Item label="email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="password" name="password">
                    <Input />
                </Form.Item>
                <Form.Item label="confirmPassword" name="confirmPassword">
                    <Input />
                </Form.Item>
                <Form.Item label="firstname" name="firstname">
                    <Input />
                </Form.Item>
                <Form.Item label="lastname" name="lastname">
                    <Input />
                </Form.Item>
                <Form.Item label="gender" name="gender">
                    <Radio.Group>
                        <Radio value="MALE"> MALE </Radio>
                        <Radio value="FEMALE"> FEMALE</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="phone" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label="description" name="description">
                    <Input />
                </Form.Item>
                {/* <Form.Item label="dateOfBirth" name="dateOfBirth">
                <DatePicker
                         format="DD-MM-YYYY"
                         showTime/>                
                </Form.Item> */}
                {/* <Form.Item label="status" name="status">
                    <Radio.Group>
                        <Radio value="ACTIVE"> Active </Radio>
                        <Radio value="INACTIVE"> Inactive</Radio>
                    </Radio.Group>
                </Form.Item> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" >
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default VehicleForm