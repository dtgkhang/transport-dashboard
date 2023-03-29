import React, { useEffect, useState } from "react";
import {
  InputNumber,
  message,
  Input,
  Button,
  Radio,
  Form,
  Row,
  Modal,
  DatePicker,
  Table,
  Popconfirm,
} from "antd";
import adminApi from "../../api/adminApi";
import { useSelector } from "react-redux";

function CompanyVoucher() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modaldata, setmodaldata] = useState({});

  const showModal = (record) => {
    setmodaldata(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setmodaldata({});
  };

  const handleCancel = () => {
    setmodaldata({});

    setIsModalOpen(false);
  };

  const { user } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [vouchers, setVouchers] = useState([]);

  //Refesh
  const [refreshKey, setRefreshKey] = useState(0);

  const handleActive = async (record) => {
    try {
      console.log(record);
      const response = await adminApi.inactiveVoucher(record.id);

      console.log(response.data);
      setRefreshKey((oldKey) => oldKey + 1);

      if (response.data) {
        message.success(response.data.message);
        // window.location.reload(false);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error(err.response.data.message);
    }
  };
  const handleUpdate = async (record) => {
    try {
      console.log(record);
      record.voucherId = modaldata.id;
      const response = await adminApi.updateVoucher(record);

      console.log(response.data);
      setRefreshKey((oldKey) => oldKey + 1);
      setmodaldata({});
      if (response.data) {
        message.success(response.data.message);
        // window.location.reload(false);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error(err.response.data.message);
    }
  };
  const getVouchers = async () => {
    try {
      const response = await adminApi.getVoucherAdmin(user.id);

      console.log(response.data);

      if (response.data) {
        setVouchers(response.data.dataList);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      // message.error("Can not get vouchers or no vouchers");
    }
  };
  const handleSubmit = async (values) => {
    try {
      values.ownerId = user.id;
      const response = await adminApi.createVouncher(values);
      console.log(JSON.stringify(values));
      if (response.data) {
        message.success(response.data.message);
        setRefreshKey((oldKey) => oldKey + 1);

        // window.location.reload(false);
        form.resetFields();
      } else {
        message.error("Add Fail!");
        console.log(response);
      }
    } catch (err) {
      message.error(err.response.data.message);
      console.log(JSON.stringify(values));
    }
  };

  const tranfer = (time) => {
    const newTime = new Date(time).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return newTime;
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // sorter: (a, b) => a.id > b.id,
      // sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: "owner",
      dataIndex: "owner",
      key: "owner",
      // filteredValue: [searchedText],
      // onFilter: (value, record) => record.employeeName.includes(value),
    },
    {
      title: "voucher Code",
      dataIndex: "voucherCode",
      key: "voucherCode",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      // filters: [
      //     {
      //         text: 'INACTIVE',
      //         value: 'INACTIVE',
      //     },
      //     {
      //         text: 'ACTIVE',
      //         value: 'ACTIVE',
      //     },],filteredValue: filteredInfo.status || null,
      // onFilter: (value, record) => record.status.includes(value),
      // sorter: (a, b) => a.status.length - b.status.length,
      // sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: "discountValue",
      dataIndex: "discountValue",
      key: "discountValue",
    },
    {
      title: "start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (date) => tranfer(date),
    },
    {
      title: "expired Time",
      dataIndex: "expiredTime",
      key: "expiredTime",
      render: (date) => tranfer(date),
    },
    {
      title: "createdTime",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (date) => tranfer(date),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleActive(record)}
          >
            {record.status === "ACTIVE" ? (
              <a className="btn btn-danger text-white">INACTIVE</a>
            ) : (
              <a className="btn btn-success text-white">ACTIVE</a>
            )}
          </Popconfirm>

          <button
            className="btn btn-primary m-1"
            onClick={() => {
              showModal(record);
              console.log("record", record);
            }}
          >
            Update
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    getVouchers();
    //   console.log("Booked ", vehicles.status);
  }, [refreshKey]);

  return (
    <div>
      <div className="col-lg-5 mx-auto">
        <div className="listing-header pb-4">
          <h3 className="title font-size-28 pb-2">List a Voucher</h3>
        </div>
        <div className="form-box">
          <div className="form-title-wrap">
            <h3 className="title">
              <i className="la la-user mr-2 text-gray" />
              Voucher information
            </h3>
          </div>
          {/* form-title-wrap */}
          <div className="form-content contact-form-action">
            <Form
              name="create"
              preserve={false}
              onFinish={handleSubmit}
              form={form}
              className="row"
            >
              <Form.Item
                label="Vouncher Code"
                name="voucherCode"
                className="col-lg-12 responsive-column"
                rules={[
                  {
                    required: true,
                    message: "Please input code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="quantity"
                name="quantity"
                className="col-lg-6 responsive-column"
                rules={[
                  {
                    required: true,
                    message: "Please input quantity!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="discountValue"
                name="discountValue"
                className="col-lg-6 responsive-column"
                rules={[
                  {
                    required: true,
                    message: "Please input !",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="startTime"
                name="startTime"
                className="col-lg-6 responsive-column"
                rules={[
                  {
                    required: true,
                    message: "Please input !",
                  },
                ]}
              >
                <DatePicker format="DD-MM-YYYY HH:mm" showTime />
              </Form.Item>
              <Form.Item
                label="expiredTime"
                name="expiredTime"
                className="col-lg-6 responsive-column"
                rules={[
                  {
                    required: true,
                    message: "Please input !",
                  },
                ]}
              >
                <DatePicker format="DD-MM-YYYY HH:mm" showTime />
              </Form.Item>
              <div className="submit-box  mx-auto">
                <div className="btn-box pt-3  mx-auto">
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button  mx-auto"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              </div>
              {/* end submit-box */}
            </Form>
          </div>
          {/* end form-content */}
        </div>
        {/* end form-box */}
      </div>
      <Table columns={columns} dataSource={vouchers} />;{/* modal update */}
      {modaldata ? (
        <Modal
          destroyOnClose={true}
          width={600}
          footer={null}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="form-content contact-form-action">
            <Form
              name="update"
              preserve={false}
              onFinish={handleUpdate}
              form={form}
              className="row"
              initialValues={{
                ["quantity"]: modaldata.quantity,
                // ["expiredTime"]: modaldata.voucherCode,
                // ["startTime"]: modaldata.voucherCode,
              }}
            >
              <Form.Item
                label="quantity"
                name="quantity"
                className="col-lg-12 responsive-column"
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="startTime"
                name="startTime"
                className="col-lg-6 responsive-column"
              >
                <DatePicker format="DD-MM-YYYY HH:mm" showTime />
              </Form.Item>
              <Form.Item
                label="expiredTime"
                name="expiredTime"
                className="col-lg-6 responsive-column"
              >
                <DatePicker format="DD-MM-YYYY HH:mm" showTime />
              </Form.Item>
              <div className="submit-box">
                <div className="btn-box pt-3">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Submit
                  </Button>{" "}
                </div>
              </div>
              {/* end submit-box */}
            </Form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default CompanyVoucher;
