import React, { useEffect, useState } from "react";
import {
  DatePicker,
  InputNumber,
  Select,
  Upload,
  Input,
  Radio,
  Form,
  Row,
  Modal,
  message,
  Button,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import companyApi from "../../../api/companyApi";
import { HideLoading, ShowLoading } from "../../../redux/alertsSlice";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function UpdateTrip({
  isModalOpen,
  handleOk,
  handleCancel,
  setRefresh,
  record,
}) {
  //
  const { user } = useSelector((state) => state.user);

  dayjs.extend(customParseFormat);
  const { RangePicker } = DatePicker;

  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);
  const navigate = useNavigate();

  //img

  const handleSubmit = async(values) => {
    try {
      console.log(values);
      // const fvalues = JSON.stringify(values.ima2)
      //
    //   values.companyId = user.companyId;
      const response = await companyApi.updateTrip(user.companyId,values)
      setRefresh((oldKey) => oldKey + 1);
      message.success(response.data.message);

      if (response.data) {
        message.success(response.data.message);
        setRefresh((oldKey) => oldKey + 1);
      }
      dispatch(HideLoading());
    } catch (err) {
      message.error(err.message);
      console.log(values);
    }
  };
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
    console.log(vehicles);
  }, []);
  return (
    <Modal
      destroyOnClose
      width={600}
      title="Update Trip"
      footer={null}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      
    >
      <Form onFinish={handleSubmit}>
     
        <Form.Item label="Time Departure" name="timeDeparture">
          <DatePicker format="DD-MM-YYYY HH:mm" showTime />
        </Form.Item>
        <Form.Item label="Time Arrival" name="timeArrival">
          <DatePicker format="DD-MM-YYYY HH:mm" showTime />
        </Form.Item>
        {/* <Form.Item label="CompanyID" name="companyId"  initialValues={user.companyId}>
                    <Radio.Group>
                        <Radio value={user.companyId}> This company </Radio>
                    </Radio.Group>
                </Form.Item> */}
        <Form.Item label="description" name="description">
          <Input defaultValue={record.description}/>
        </Form.Item>
        <Form.Item label="Driver" name="employeeName">
          <Input defaultValue={record.employeeName} />
        </Form.Item>
        <Form.Item label="price" name="price">
          <InputNumber defaultValue={record.price}/>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateTrip;
