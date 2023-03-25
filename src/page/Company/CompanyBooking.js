import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Popconfirm,
    message,
    Table,
    Space,
    Button,
    Input,
    Dropdown,
  } from "antd";
import companyApi from "../../api/companyApi";
function CompanyBooking() {

    const [vehicles, setVehicles] = useState([]);
const { user } = useSelector((state) => state.user);

const dispatch = useDispatch();
//Refesh
const [refreshKey, setRefreshKey] = useState(0);


const getBooked = async () => {
  try {
    const response = await companyApi.getBooked(user.companyId);

    console.log(response.data);

    if (response.data) {
      setVehicles(response.data);
    } else {
      message.error(response.data.message);
    }
  } catch (err) {
    message.error(err.message);
  }
};
const price = (price) =>{ const  newPrice = price.toLocaleString("it-IT", {
  style: "currency",
  currency: "VND",
});
return newPrice
}

//
const handleConfirm = async (booked) => {
  try {
    console.log(booked);
    const response = await companyApi.confirmBooking(booked.id);

    console.log(response.data);
    setRefreshKey(oldKey => oldKey +1)

    if (response.data) {
      message.success(response.data.message);
      // window.location.reload(false);
      const sEmail = booked.c_Email ? booked.c_Email:  booked.email
      window.Email.send({
        Host: "smtp.elasticemail.com",
        Username : "kgzeref@gmail.com",
        Password : "44E27D2678B035AAC846BC9057D6A2FF67F6",
        To : `${sEmail}`,
        From : "kgzeref@gmail.com",
        Subject : "confirm payment",
        Body : `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Invoice</title>
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
              rel="stylesheet"
            />
            <style>
              @media print {
                @page {
                  size: A3;
                }
              }
              ul {
                padding: 0;
                margin: 0 0 1rem 0;
                list-style: none;
              }
              body {
                font-family: "Inter", sans-serif;
                margin: 0;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              table,
              table th,
              table td {
                border: 1px solid silver;
              }
              table th,
              table td {
                text-align: right;
                padding: 8px;
              }
              h1,
              h4,
              p {
                margin: 0;
              }
        
              .container {
                padding: 20px 0;
                width: 1000px;
                max-width: 90%;
                margin: 0 auto;
              }
        
              .inv-title {
                padding: 10px;
                border: 1px solid silver;
                text-align: center;
                margin-bottom: 30px;
              }
        
              .inv-logo {
                width: 150px;
                display: block;
                margin: 0 auto;
                margin-bottom: 40px;
              }
        
              /* header */
              .inv-header {
                display: flex;
                margin-bottom: 20px;
              }
              .inv-header > :nth-child(1) {
                flex: 2;
              }
              .inv-header > :nth-child(2) {
                flex: 1;
              }
              .inv-header h2 {
                font-size: 20px;
                margin: 0 0 0.3rem 0;
              }
              .inv-header ul li {
                font-size: 15px;
                padding: 3px 0;
              }
        
              /* body */
              .inv-body table th,
              .inv-body table td {
                text-align: left;
              }
              .inv-body {
                margin-bottom: 30px;
              }
        
              /* footer */
              .inv-footer {
                display: flex;
                flex-direction: row;
              }
              .inv-footer > :nth-child(1) {
                flex: 2;
              }
              .inv-footer > :nth-child(2) {
                flex: 1;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="inv-title">
                <h1>Invoice # 424773</h1>
              </div>
              <div class="inv-header">
                <div>
                  <h2>SWP Team</h2>
                  <ul>
                    <li>Bus Booking</li>
                    <li>Ho Chi Minh</li>
                    <li>0338148702 |dtgkhang99@gmail.com</li>
                  </ul>
                </div>
                <div>
                  <table>
                    <tr>
                      <th>Due Date</th>
                      <td>${tranfer(booked.createBookingTime)}</td>
                    </tr>
              
                    <tr>
                      <th>Total</th>
                      <td>0</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="inv-body">
              Refund !
              </div>
              <div class="inv-footer">
                <div><!-- required --></div>
                <div>
      
                </div>
              </div>
            </div>
          </body>
        </html>              `
    }).then(
      message => alert(message)
    );
    } else {
      message.error(response.data.message);
    }
  } catch (err) {
    message.error(err.message);
  }
};

const handleRefund = async (booked) => {
  try {
    const response = await companyApi.confirmRefund(booked.id);

    console.log(response.data);
    setRefreshKey(oldKey => oldKey +1)

    if (response.data) {
      message.success(response.data.message);
      message.success(response.data.message);
      const sEmail = booked.c_Email ? booked.c_Email:  booked.email
      window.Email.send({
        Host: "smtp.elasticemail.com",
        Username : "kgzeref@gmail.com",
        Password : "44E27D2678B035AAC846BC9057D6A2FF67F6",
        To : `${sEmail}`,
        From : "kgzeref@gmail.com",
        Subject : "confirm refund",
        Body : `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Invoice</title>
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
              rel="stylesheet"
            />
            <style>
              @media print {
                @page {
                  size: A3;
                }
              }
              ul {
                padding: 0;
                margin: 0 0 1rem 0;
                list-style: none;
              }
              body {
                font-family: "Inter", sans-serif;
                margin: 0;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              table,
              table th,
              table td {
                border: 1px solid silver;
              }
              table th,
              table td {
                text-align: right;
                padding: 8px;
              }
              h1,
              h4,
              p {
                margin: 0;
              }
        
              .container {
                padding: 20px 0;
                width: 1000px;
                max-width: 90%;
                margin: 0 auto;
              }
        
              .inv-title {
                padding: 10px;
                border: 1px solid silver;
                text-align: center;
                margin-bottom: 30px;
              }
        
              .inv-logo {
                width: 150px;
                display: block;
                margin: 0 auto;
                margin-bottom: 40px;
              }
        
              /* header */
              .inv-header {
                display: flex;
                margin-bottom: 20px;
              }
              .inv-header > :nth-child(1) {
                flex: 2;
              }
              .inv-header > :nth-child(2) {
                flex: 1;
              }
              .inv-header h2 {
                font-size: 20px;
                margin: 0 0 0.3rem 0;
              }
              .inv-header ul li {
                font-size: 15px;
                padding: 3px 0;
              }
        
              /* body */
              .inv-body table th,
              .inv-body table td {
                text-align: left;
              }
              .inv-body {
                margin-bottom: 30px;
              }
        
              /* footer */
              .inv-footer {
                display: flex;
                flex-direction: row;
              }
              .inv-footer > :nth-child(1) {
                flex: 2;
              }
              .inv-footer > :nth-child(2) {
                flex: 1;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="inv-title">
                <h1>Invoice # ${booked.id}</h1>
              </div>
              <div class="inv-header">
                <div>
                  <h2>SWP Team</h2>
                  <ul>
                    <li>Bus Booking</li>
                    <li>Ho Chi Minh</li>
                    <li>0338148702 |dtgkhang99@gmail.com</li>
                  </ul>
                </div>
                <div>
                  <table>
                    <tr>
                      <th>Due Date</th>
                      <td>${tranfer(booked.createBookingTime)}</td>
                    </tr>
              
                    <tr>
                      <th>Total</th>
                      <td>0</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="inv-body">
              Refund !
              </div>
              <div class="inv-footer">
                <div><!-- required --></div>
                <div>
      
                </div>
              </div>
            </div>
          </body>
        </html>              `
    }).then(
      message => alert(message)
    );
      // window.location.reload(false);
    } else {
      message.error(response.data.message);
    }
  } catch (err) {
    message.error(err.message);
  }
};

const cancelBooking = async (booked) => {
  try {
    const response = await companyApi.cancelBooking(booked.id);

    console.log(response.data);
    setRefreshKey(oldKey => oldKey +1)

    if (response.data) {
      message.success(response.data.message);
      message.success(response.data.message);
      const sEmail = booked.c_Email ? booked.c_Email:  booked.email
      window.Email.send({
        Host: "smtp.elasticemail.com",
        Username : "kgzeref@gmail.com",
        Password : "44E27D2678B035AAC846BC9057D6A2FF67F6",
        To : `${sEmail}`,
        From : "kgzeref@gmail.com",
        Subject : "Cancel Booking",
        Body : `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Invoice</title>
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
              rel="stylesheet"
            />
            <style>
              @media print {
                @page {
                  size: A3;
                }
              }
              ul {
                padding: 0;
                margin: 0 0 1rem 0;
                list-style: none;
              }
              body {
                font-family: "Inter", sans-serif;
                margin: 0;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              table,
              table th,
              table td {
                border: 1px solid silver;
              }
              table th,
              table td {
                text-align: right;
                padding: 8px;
              }
              h1,
              h4,
              p {
                margin: 0;
              }
        
              .container {
                padding: 20px 0;
                width: 1000px;
                max-width: 90%;
                margin: 0 auto;
              }
        
              .inv-title {
                padding: 10px;
                border: 1px solid silver;
                text-align: center;
                margin-bottom: 30px;
              }
        
              .inv-logo {
                width: 150px;
                display: block;
                margin: 0 auto;
                margin-bottom: 40px;
              }
        
              /* header */
              .inv-header {
                display: flex;
                margin-bottom: 20px;
              }
              .inv-header > :nth-child(1) {
                flex: 2;
              }
              .inv-header > :nth-child(2) {
                flex: 1;
              }
              .inv-header h2 {
                font-size: 20px;
                margin: 0 0 0.3rem 0;
              }
              .inv-header ul li {
                font-size: 15px;
                padding: 3px 0;
              }
        
              /* body */
              .inv-body table th,
              .inv-body table td {
                text-align: left;
              }
              .inv-body {
                margin-bottom: 30px;
              }
        
              /* footer */
              .inv-footer {
                display: flex;
                flex-direction: row;
              }
              .inv-footer > :nth-child(1) {
                flex: 2;
              }
              .inv-footer > :nth-child(2) {
                flex: 1;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="inv-title">
                <h1>Invoice # ${booked.id}</h1>
              </div>
              <div class="inv-header">
                <div>
                  <h2>SWP Team</h2>
                  <ul>
                    <li>Bus Booking</li>
                    <li>Ho Chi Minh</li>
                    <li>0338148702 |dtgkhang99@gmail.com</li>
                  </ul>
                </div>
                <div>
                  <table>
                    <tr>
                      <th>Due Date</th>
                      <td>${tranfer(booked.createBookingTime)}</td>
                    </tr>
              
                    <tr>
                      <th>Total</th>
                      <td>0</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="inv-body">
              Refund !
              </div>
              <div class="inv-footer">
                <div><!-- required --></div>
                <div>
      
                </div>
              </div>
            </div>
          </body>
        </html>              `
    }).then(
      message => alert(message)
    );
      // window.location.reload(false);
    } else {
      message.error(response.data.message);
    }
  } catch (err) {
    message.error(err.message);
  }
};

const [searchedText, setSearchedText] = useState([]);

const [filteredInfo, setFilteredInfo] = useState({});
const [sortedInfo, setSortedInfo] = useState({});
const handleChange = (pagination, filters, sorter, search) => {
  console.log("Various parameters", pagination, filters, sorter, search);
  setFilteredInfo(filters);
  setSortedInfo(sorter);
};
const clearFilters = () => {
  setFilteredInfo({});
};
const clearAll = () => {
  setFilteredInfo({});
  setSortedInfo({});
};
const items = [
  { key: "1", label: "Set ACTIVE" },
  { key: "2", label: "Set INACTIVE" },
];
// const renderCustomCell= (object) => {
//     const { customerResponse } = object;
// };
const columns = [
  {
    title: "BookId",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id > b.id,
    sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: "phone",
    dataIndex: "c_Phone",
    key: "c_Phone",
    filteredValue: [searchedText],
    // onFilter: (value, record) => record.c_Phone ?  record.c_Phone.includes(value) :  record.phone.includes(value),
    render: (_, record) => record.c_Phone ? record.c_Phone : record.phone,

  },
  {
    title: "email",
    dataIndex: "c_Email",
    key: "c_Email",
    filteredValue: [searchedText],
        onFilter: (value, record) => record.c_Email ?  record.c_Email.includes(value) :  record.email.includes(value),

    render: (_, record) => record.c_Email ? record.c_Email : record.email,
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (_, record) => price(record.totalPrice),

  },
  {
    title: "tripId",
    dataIndex: "tripId",
    key: "tripId",
    render: (_, record) => record.tripResponse.tripId,
    
  },
  {
    title: "seats",
    dataIndex: "createBookingTime",
    key: "createBookingTime",
    render: (_, record) => record.seatResponse.map(item=>item.seatNumber + ',')  ,

    
  },
  {
    title: "create BookingTime",
    dataIndex: "createBookingTime",
    key: "createBookingTime",
    render: ((date) => tranfer(date)),

    
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sortDirections: ["descend", "ascend"],
    filters: [
      {
        text: "REJECTED",
        value: "REJECTED",
      },
      {
        text: "DONE",
        value: "DONE",
      },      {
        text: "PENDING",
        value: "PENDING",
      },   {
        text: "REQUESTREFUND",
        value: "REQUESTREFUND",
      },   {
        text: "PAYLATER",
        value: "PAYLATER",
      },
    ],
    filteredValue: filteredInfo.status || null,
    onFilter: (value, record) => record.status === value,
    sorter: (a, b) => a.status.length - b.status.length,
    sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width:"15%",
    render: (_, record) => (
      <div className="">
        <div className="m-1">
        <Popconfirm
        title="Sure to change?"
        className="btn btn-primary text-white"
        onConfirm={() => handleConfirm(record)}
      >
        <a>Confirm</a> 
      </Popconfirm>

        </div>
      <div className="m-1">
        {record.status === "REQUESTREFUND" ?    <Popconfirm
        title="Sure to change?"
        className="btn btn-danger text-white"
        onConfirm={() => handleRefund(record)}
      >
        <a>Refund</a>
      </Popconfirm> :''}

      </div>
      <div className="m-1">
        <Popconfirm
        title="Sure to cancel?"
        className="btn btn-danger text-white"
        onConfirm={() => cancelBooking(record)}
      >
        <a>Cancel</a> 
      </Popconfirm>

        </div>
 
      </div>
  
    

    ),
  },

];

const totalActive=(arr)=>{
  let active =0
  arr.map(x=>
    {  if(x.status === "DONE"){
      active++
      }}
  )
  return active;
}
const totalIntive=(arr)=>{
  let inactive =0
  arr.map(x=>
    {  if(x.status === "REJECTED"){
      inactive++
      }}
  )
  return inactive;
}

const requestRefund=(arr)=>{
  let inactive =0
  arr.map(x=>
    {  if(x.status === "REQUESTREFUND"){
      inactive++
      }}
  )
  return inactive;
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

useEffect(() => {
    getBooked();
//   console.log("Booked ", vehicles.status);
}, [refreshKey]);

    return (

          <div>
                     <div className="d-block">
                
                <div className="row mt-4">
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Total Bookings</p>
                          <h4 className="info__title">{vehicles.length}</h4>
                        </div>{/* end info-content */}
                        <div className="info-icon icon-element bg-4">
                          <i className="la la-shopping-cart" />
                        </div>{/* end info-icon*/}
                      </div>
                      <div className="section-block" />
                      <a href="admin-dashboard-booking.html" className="d-flex align-items-center justify-content-between view-all">View All <i className="la la-angle-right" /></a>
                    </div>
                  </div>{/* end col-lg-3 */}
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Total Done!</p>
                          <h4 className="info__title">{ totalActive(vehicles)}</h4>
                        </div>{/* end info-content */}
                        <div className="info-icon icon-element bg-3">
                          <i className="la la-star" />
                        </div>{/* end info-icon*/}
                      </div>
                      <div className="section-block" />
                      <a href="admin-dashboard-reviews.html" className="d-flex align-items-center justify-content-between view-all">View All <i className="la la-angle-right" /></a>
                    </div>
                  </div>{/* end col-lg-3 */}
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Total REJECTED!</p>
                          <h4 className="info__title">{totalIntive(vehicles)}</h4>
                        </div>{/* end info-content */}
                        <div className="info-icon icon-element bg-2">
                          <i className="la la-envelope" />
                        </div>{/* end info-icon*/}
                      </div>
                      <div className="section-block" />
                      <a href="admin-dashboard-subscribers.html" className="d-flex align-items-center justify-content-between view-all">View All <i className="la la-angle-right" /></a>
                    </div>
                  </div>{/* end col-lg-3 */}
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Request-Refund</p>
                          <h4 className="info__title">{requestRefund(vehicles)}</h4>
                        </div>{/* end info-content */}
                        <div className="info-icon icon-element bg-1">
                          <i className="la la-bookmark-o" />
                        </div>{/* end info-icon*/}
                      </div>
                      <div className="section-block" />
                      <a href="admin-dashboard-wishlist.html" className="d-flex align-items-center justify-content-between view-all">View All <i className="la la-angle-right" /></a>
                    </div>
                  </div>{/* end col-lg-3 */}
                </div>{/* end row */}
                      </div>
            <Space
              style={{
                marginBottom: 16,
              }}
            >
              <Input.Search
                placeholder="Search here..."
                onSearch={(value) => {
                  setSearchedText(value);
                }}
              />
              <Button onClick={clearFilters}>Clear filters</Button>
              <Button onClick={clearAll}>Clear filters and sorters</Button>

            </Space>
            <Table columns={columns} dataSource={vehicles} onChange={handleChange} />;

          </div>    )
}

export default CompanyBooking