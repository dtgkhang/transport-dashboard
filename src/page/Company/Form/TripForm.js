import React, {useEffect, useState} from 'react'
import {DatePicker, InputNumber, Select, Upload, Input, Radio, Form, Row, Modal, message, Button} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import companyApi from "../../../api/companyApi";
import {HideLoading, ShowLoading} from "../../../redux/alertsSlice";
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';

function TripForm({isModalOpen,handleOk,handleCancel}) {
    const {user}= useSelector(state => state.user);

    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;
    const dispatch = useDispatch();
    const {company}= useSelector(state => state.company);
    const navigate =useNavigate();
    const handleSubmit = async (values) => {
        try {            console.log(values)
            // const fvalues = JSON.stringify(values.ima2)


            const response = await companyApi.createTrip(values)
            console.log(response)
            if (response.data) {
                message.success(response.data.message)
                window.location.reload(false);
                navigate("/company/vehicle")
            } else {
                message.error("Add Fail!")
                console.log(response)
            }
        } catch (err) {
            message.error(err.message)
            console.log(values)
        }
    }
    const [vehicles, setVehicles] = useState([]);

    const getVehicles = async () => {
        try {

            const response = await companyApi.getVehicleByCompanyId(user.companyId);

            console.log(response.data.list_vehicle);

            if (response.data) {
                dispatch(ShowLoading());
                setVehicles(response.data.list_vehicle);
                dispatch(HideLoading());

            } else {
                message.error(response.data.message);
            }
        } catch (err) {
            message.error(err.message);
        }
    };
    useEffect(() => {

        getVehicles();
        console.log(vehicles)
    },[]);
    return (
        <Modal  width={600} title="Add Trip" footer={null}  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form onFinish={handleSubmit}>
                <Form.Item label="Vehicles" name="vehicleId">

                    <Select
                    >
                        {vehicles.map((vehicle) => (
                          vehicle.status === "ACTIVE" ? <Select.Option value={vehicle.vehicleId}>VehicleId: {vehicle.vehicleId} - licensePlates: {vehicle.licensePlates} - Status:{vehicle.status}</Select.Option>:<></>
                        ))}

                        {/*<Select.Option value="saigon">Xe1</Select.Option>*/}
                        {/*<Select.Option value="vungtau">Xe2</Select.Option>*/}
                        {/*<Select.Option value="dalat">Xe3</Select.Option>*/}
                        {/*<Select.Option value="dongthap">xe4</Select.Option>*/}
                    </Select>
                </Form.Item>
                <Form.Item label="Time Arrival" name="timeArrival">
                    <DatePicker
                        />
                </Form.Item>
                <Form.Item label="Time Departure" name="timeDeparture">
                    <DatePicker

                        format="DD-MM-YYYY HH:mm"
                        showTime/>
                </Form.Item>
                <Form.Item label="CompanyID" name="companyId"  initialValues={user.companyId}>
                    <Radio.Group>
                        <Radio value={user.companyId}> This company </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="description" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="Driver" name="employeeName">
                    <Input />
                </Form.Item>
                <Form.Item label="price" name="price">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="img" name="image">
                    <Input />
                </Form.Item>
                <Form.Item label="City Arrival" name="cityArrival">
                    <Select>
                        <Select.Option value="Sài Gòn">Sài Gòn</Select.Option>
                        <Select.Option value="Huế">Huế</Select.Option>
                        <Select.Option value="Nha Trang">Nha Trang</Select.Option>
                        <Select.Option value="Đà Lạt">Đà Lạt</Select.Option>

                    </Select>
                </Form.Item>
                <Form.Item label="City Departure" name="cityDeparture">
                    <Select>
                        <Select.Option value="Sài Gòn">Sài Gòn</Select.Option>
                        <Select.Option value="Huế">Huế</Select.Option>
                        <Select.Option value="Nha Trang">Nha Trang</Select.Option>
                        <Select.Option value="Đà Lạt">Đà Lạt</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="ima2" label="Trip Image"
                >
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
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

export default TripForm