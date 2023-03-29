import { Popconfirm,message, Table,Space,Button,Input,Dropdown, Grid, Descriptions, Badge } from "antd";
import React, {  useRef, useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import VehicleForm from "./Form/VehicleForm";
import {HideLoading, ShowLoading} from "../../redux/alertsSlice";
import Highlighter from 'react-highlight-words';
import { SearchOutlined ,DownOutlined} from '@ant-design/icons';
import companyApi from "../../api/companyApi";
import TripForm from "./Form/TripForm";
import UpdateTrip from "./Form/UpdateTrip";

const CompanyTrip = () => {
    const [trips, setTrips] = useState([]);
    const {user}= useSelector(state => state.user);
    //refresh
    const [refreshKey, setRefreshKey] = useState(0);
    const [tripLenght, setTripLength] = useState(0);

    const dispatch = useDispatch();
    const price = (price) =>{ const  newPrice = price.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      return newPrice
      }
    const getVehicles = async () => {
        try {
            const response = await companyApi.getTripByCompanyId(user.companyId);

            console.log(response.data.list_trip_Company);

            if (response.data) {
                dispatch(ShowLoading());

                setTrips(response.data.list_trip_Company);
                setTripLength(response.data.list_trip_Company.length)
                dispatch(HideLoading());

            } else {
                message.error(response.data.message);
            }
        } catch (err) {
            // message.error(err.message);
        }
    };
    const [searchedText, setSearchedText] = useState([]);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter,search) => {
        console.log('Various parameters', pagination, filters, sorter,search);
        setFilteredInfo(filters);
        setSortedInfo(sorter);

    };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    }
    const items = [
        { key: '1', label: 'Set ACTIVE',},
        { key: '2', label: 'Set INACTIVE' },
    ];
    const handleActive = async (record) => {
        try {
            console.log(record)
            const response = await companyApi.deleteTrip(record.tripId);
            console.log(response.data);

            if (response.data) {
                setRefreshKey(oldKey => oldKey +1)
                message.success(response.data.message);

            } else {
                message.error(response.data.message);
            }
        } catch (err) {
            message.error(err.message);
        }
    };
    const [modaldata, setmodaldata] = useState([]);

    const columns = [
        {
            title: 'Trip ID',
            dataIndex: 'tripId',
            key: 'tripId',
            sorter: (a, b) => a.tripId > b.tripId,
            sortOrder: sortedInfo.columnKey === 'tripId' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Employee Name',
            dataIndex: 'employeeName',
            key: 'employeeName',
            filteredValue: [searchedText],
            onFilter: (value, record) => record.employeeName.includes(value),

        },        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'INACTIVE',
                    value: 'INACTIVE',
                },
                {
                    text: 'ACTIVE',
                    value: 'ACTIVE',
                },
                ,
                {
                    text: 'UPDATE',
                    value: 'UPDATE',
                },
                {
                    text: 'DOING',
                    value: 'DOING',
                }],filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value),
            sorter: (a, b) => a.status.length - b.status.length,
            sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            ellipsis: true,

        },        {
            title: 'Pay Later',
            dataIndex: 'allowPaylater',
            key: 'allowPaylater',
            render:(_, record) => <> {record.allowPaylater ? "Yes" : "No"}</>
        },       {
            title: 'Time Departure',
            dataIndex: 'timeDeparture',
            key: 'timeDeparture',
            render: ((date) => tranfer(date)),

        },       {
            title: 'Time Arrival',
            dataIndex: 'timeArrival',
            key: 'timeArrival',
            render: ((date) => tranfer(date)),

        },{
            title: 'seat Quantity',
            dataIndex: 'seatQuantity',
            key: 'seatQuantity',
            render:(_, record) => record.vehicle.seatCapacity+"/"+record.seatQuantity

        },
        {
            title: 'Arrival',
            dataIndex: `arrival`,
            key: 'arrival',
        },{
            title: 'Departure',
            dataIndex: `departure`,
            key: 'departure',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, vehicleId) =>
            <>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleActive(vehicleId)}>
                   { vehicleId.status === "ACTIVE" ? <a className="btn btn-primary text-white">PAUSE</a> : ""}
                   { vehicleId.status === "UPDATE" ? <a className="btn btn-primary text-white">ACTIVE</a> : ""}

                </Popconfirm>

            <button className="btn btn-primary m-1" onClick={()=>showModal1(vehicleId)}>
                Update
            </button>
            </>
                

        },
    ];

    const totalActive=(arr)=>{
        let active =0
        arr.map(x=>
          {  if(x.status === "ACTIVE"){
            active++
            }}
        )
        return active;
    }
    const totalIntive=(arr)=>{
        let inactive =0
        arr.map(x=>
          {  if(x.status === "INACTIVE"){
            inactive++
            }}
        )
        return inactive;
    }
    const getFullDate = (date) => {
        const dateAndTime = date.split('T');

        return dateAndTime[0].split('-').reverse().join('-');
    };
    const todayTrip=(arr)=>{
        let Ctoday =0
        let today = new Date();

        let date=today.getDate() + "-0"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
        
        console.log(date)

        arr.map(x=>
            
          { 
            let tripDate =getFullDate(x.timeDeparture)
            console.log("tripD",tripDate)
            if(tripDate == date){
                Ctoday++
            }}
        )
        return Ctoday;
    }
   
    useEffect(() => {
        getVehicles();
        console.log('tripL',tripLenght)

    },[refreshKey]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
////

const [isModalOpen1, setIsModalOpen1] = useState(false);

const showModal1 = (record) => {
    setmodaldata(record);
    setIsModalOpen1(true);
};

const handleOk1 = () => {
    setIsModalOpen1(false);
};

const handleCancel1 = () => {
    setIsModalOpen1(false);
};

  
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
    return<div>
      
         <div className="d-block">
                
                <div className="row mt-4">
                  <div className="col-lg-3 responsive-column-l">
                    <div className="icon-box icon-layout-2 dashboard-icon-box pb-0">
                      <div className="d-flex pb-3 justify-content-between">
                        <div className="info-content">
                          <p className="info__desc">Total trips</p>
                          <h4 className="info__title">{trips.length}</h4>
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
                          <p className="info__desc">Total Active</p>
                          <h4 className="info__title">{trips ? totalActive(trips) : ''}</h4>
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
                          <p className="info__desc">Total Inactive!</p>
                          <h4 className="info__title">{totalIntive(trips)}</h4>
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
                          <p className="info__desc">Today Trip</p>
                          <h4 className="info__title">{todayTrip(trips)}</h4>
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
           

            <Input.Search placeholder="Search here..." onSearch={(value) => {setSearchedText(value)}} />
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>
            <button className="btn btn-primary" onClick={showModal}>
                Add Trip
            </button>
        </Space>
        <Table columns={columns} dataSource={trips}  onChange={handleChange}
         expandable={{
            expandedRowRender: (record) => (
                <Descriptions title="Info" layout="vertical" bordered>
                <Descriptions.Item label="Vehicle license">{record.vehicle.licensePlates}</Descriptions.Item>
                <Descriptions.Item label="Vehicle Type">{record.vehicle.licensePlates}</Descriptions.Item>
                <Descriptions.Item label="Allow Pay Later">{record.allowPaylater ? "Yes" : "No"}</Descriptions.Item>
                <Descriptions.Item label="Allow edit before" span={2}>
                  {record.timeReturn}
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                  <Badge status="processing" text={record.status} />
                </Descriptions.Item>
                <Descriptions.Item label="Price">{price(record.price)}</Descriptions.Item>
             
                <Descriptions.Item label="Descriptions">
                  {record.description}
                </Descriptions.Item>
              </Descriptions>
            ),
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
        
        />;
        {isModalOpen && <TripForm
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            setRefresh={setRefreshKey}
            tripLenght={tripLenght}
            />}

           {isModalOpen1 && <UpdateTrip  isModalOpen={isModalOpen1}
            handleOk={handleOk1}
            handleCancel={handleCancel1}
            setRefresh={setRefreshKey}
            record={modaldata}
            />
            }
    </div>
};
export default CompanyTrip;