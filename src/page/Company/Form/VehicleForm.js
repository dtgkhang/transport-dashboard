import React from 'react'
import {message,Input, Button, Radio, Form,Row, Modal} from 'antd'
import companyApi from "../../../api/companyApi";
import {useSelector} from "react-redux";
import {createRoutesFromChildren, useNavigate} from "react-router-dom";

function VehicleForm({isModalOpen,handleOk,handleCancel,setRefresh}) {
    const {user}= useSelector(state => state.user);
 const navigate =useNavigate();
    const handleSubmit = async (values) => {
        try {
            values.companyId = user.companyId;
            const response = await companyApi.createVehicle(values)
            console.log(values)
            if (response.data) {
                message.success(response.data.message)
                // window.location.reload(false);
                setRefresh(oldKey => oldKey +1)

                navigate("/company/vehicle")

                // if(localStorage.getItem("role")=="COM")
                //   navigate("/agency")
                // else if(localStorage.getItem("role")=="US"){
                //   navigate("/home")
                // }
            } else {
                message.error("Add Fail!")
                console.log(response)
            }
        } catch (err) {
            message.error(err.message)
            console.log(values)
        }
    }

        return (
        <Modal  width={600} title="Add Vehicle" footer={null}  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} setRefresh={setRefresh}>
            <Form onFinish={handleSubmit}>
                <Form.Item label="Vehicle type" name="vehicleType" rules={[
                        {
                          required: true,
                          message: 'Please select',
                        },
                      ]} >
                    <Radio.Group>
                        <Radio value="BUS"> Bus - 40 seats </Radio>
                        <Radio value="LIMOUSINE"> limo - 9 seats</Radio>
                    </Radio.Group>
                </Form.Item>
                {/* <Form.Item label="CompanyID" name="companyId"  initialValues={user.companyId}>
                    <Radio.Group>
                        <Radio value={user.companyId}> This company </Radio>
                    </Radio.Group>
                </Form.Item> */}
                <Form.Item label="License" name="licensePlates" rules={[
                        {
                          required: true,
                          message: 'Please input licensePlates!',
                        },
                      ]}>
                    <Input />
                </Form.Item>
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