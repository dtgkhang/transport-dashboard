import React, { useEffect, useState } from 'react'
import {InputNumber,message,Input, Button, Radio, Form,Row, Modal, DatePicker, Table} from 'antd'
import adminApi from '../../api/adminApi'
import { useSelector } from 'react-redux';

function AdminVouncher() {
  const {user}= useSelector(state => state.user);
  const [form] = Form.useForm();
  const [vouchers, setVouchers] = useState([]);

  //Refesh
  const [refreshKey, setRefreshKey] = useState(0);


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
        values.ownerId = user.id
        const response = await adminApi.createVouncher(values)
        console.log(JSON.stringify(values))
        if (response.data) {
            message.success(response.data.message)
            // window.location.reload(false);
            form.resetFields();

        } else {
            message.error("Add Fail!")
            console.log(response)
        }
    } catch (err) {
        message.error(err.message)
        console.log(JSON.stringify(values))
    }
}
  
const tranfer=(time)=>{
  const newTime = new Date(time).toLocaleString("en-US", {
       month: "short",
       day: "2-digit",
       year: "numeric",
       hour: "2-digit",
       minute: "2-digit",
     });
     return newTime;
 }
const columns = [
  {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      // sorter: (a, b) => a.id > b.id,
      // sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      // ellipsis: true,
  },
  {
      title: 'owner',
      dataIndex: 'owner',
      key: 'owner',
      // filteredValue: [searchedText],
      // onFilter: (value, record) => record.employeeName.includes(value),

  },        {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
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

  },        {
      title: 'discountValue',
      dataIndex: 'discountValue',
      key: 'discountValue',
  },       {
      title: 'start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: ((date) => tranfer(date)),

  },       {
      title: 'expired Time',
      dataIndex: 'expiredTime',
      key: 'expiredTime',
      render: ((date) => tranfer(date)),

  }, {
      title: 'createdTime',
      dataIndex: 'createdTime',
      key: 'createdTime',
      render: ((date) => tranfer(date)),
  },
//   {
//       title: 'Action',
//       dataIndex: 'action',
//       key: 'action',
//       render: (_, vehicleId) =>
//       <>
// <Popconfirm title="Sure to delete?" onConfirm={() => handleActive(vehicleId)}>
//               <a>Update status</a>
//           </Popconfirm>

//       <button className="btn btn-primary" onClick={()=>showModal1(vehicleId)}>
//           Update Trip
//       </button>
//       </>
          

//   },
];

useEffect(() => {
  getVouchers();
//   console.log("Booked ", vehicles.status);
}, [refreshKey]);

  return (
    <div>
        

        <div className="col-lg-9 mx-auto">
        <div className="listing-header pb-4">
          <h3 className="title font-size-28 pb-2">List a Voucher</h3>
        
        </div>
        <div className="form-box">
          <div className="form-title-wrap">
            <h3 className="title"><i className="la la-user mr-2 text-gray" />Voucher information</h3>
          </div>{/* form-title-wrap */}
          <div className="form-content contact-form-action">
          <Form onFinish={handleSubmit}       form={form}
  className="row">

<Form.Item label="Vouncher Code" name="voucherCode"  className="col-lg-6 responsive-column">
    <Input />
</Form.Item>
<Form.Item label="quantity" name="quantity"  className="col-lg-3 responsive-column">
    <InputNumber />
</Form.Item>
<Form.Item label="discountValue" name="discountValue"  className="col-lg-3 responsive-column">
    <InputNumber />
</Form.Item>
<Form.Item label="startTime" name="startTime"  className="col-lg-6 responsive-column">
                    <DatePicker
                         format="DD-MM-YYYY HH:mm"
                         showTime/>
                </Form.Item>
<Form.Item label="expiredTime" name="expiredTime"  className="col-lg-6 responsive-column">
                    <DatePicker
                         format="DD-MM-YYYY HH:mm"
                         showTime/>
                </Form.Item>
                <div className="submit-box">
        
          <div className="btn-box pt-3">
          <Button type="primary" htmlType="submit" className="login-form-button" >
        Submit
    </Button>          </div>
        </div>{/* end submit-box */}

       
</Form>
         
          </div>{/* end form-content */}
        </div>{/* end form-box */}
      

      </div>

      <Table columns={columns} dataSource={vouchers}  />;


    </div>
  )
}

export default AdminVouncher