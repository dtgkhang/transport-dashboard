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

    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;
    const dispatch = useDispatch();
    const {company}= useSelector(state => state.company);
    const navigate =useNavigate();
    const handleSubmit = async (values) => {
        try {            console.log(values)
            const fvalues = JSON.stringify(values)
            console.log(fvalues)

            const response = await companyApi.createTrip(values)
            console.log(response)
            if (response.data) {
                message.success(response.data.message)
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
    const [vehicles, setVehicles] = useState([]);

    const getVehicles = async () => {
        try {

            const response = await companyApi.getVehicleByCompanyId(4);

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
                <Form.Item label="companyId" name="companyId">
                    <InputNumber />
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
                <Form.Item label="Driver" name="image">
                    <Input />
                </Form.Item>
                <Form.Item label="City Arrival" name="cityArrival">
                    <Select>
                        <Select.Option value="SG">Sài Gòn</Select.Option>
                        <Select.Option value="vungtau">Vũng Tàu</Select.Option>
                        <Select.Option value="Đl">Đà Lạt</Select.Option>
                        <Select.Option value="dongthap">Đồng Tháp</Select.Option>

                    </Select>
                </Form.Item>
                <Form.Item label="City Departure" name="cityDeparture">
                    <Select>
                        <Select.Option value="SG">Sài Gòn</Select.Option>
                        <Select.Option value="vungtau">Vũng Tàu</Select.Option>
                        <Select.Option value="Đl">Đà Lạt</Select.Option>
                        <Select.Option value="dongthap">Đồng Tháp</Select.Option>          </Select>
                </Form.Item>
                <Form.Item label="Trip Image" valuePropName="fileList">
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