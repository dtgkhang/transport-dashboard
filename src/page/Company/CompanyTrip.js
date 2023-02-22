import { Popconfirm,message, Table,Space,Button,Input,Dropdown } from "antd";
import React, {  useRef, useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import VehicleForm from "./Form/VehicleForm";
import {HideLoading, ShowLoading} from "../../redux/alertsSlice";
import Highlighter from 'react-highlight-words';
import { SearchOutlined ,DownOutlined} from '@ant-design/icons';
import companyApi from "../../api/companyApi";
import TripForm from "./Form/TripForm";

const CompanyTrip = () => {
    const [trips, setTrips] = useState([]);

    const dispatch = useDispatch();

    const getVehicles = async () => {
        try {
            const response = await companyApi.getTripByCompanyId(4);

            console.log(response.data.list_trip_Company);

            if (response.data) {
                dispatch(ShowLoading());

                setTrips(response.data.list_trip_Company);
                dispatch(HideLoading());

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
            const response = await companyApi.updateActive(record.vehicleId);

            console.log(response.data);

            if (response.data) {
                message.success(response.data.message);

            } else {
                message.error(response.data.message);
            }
        } catch (err) {
            message.error(err.message);
        }
    };
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
            title: 'employee Name',
            dataIndex: 'employeeName',
            key: 'employeeName',
            filteredValue: [searchedText],
            // onFilter: (value, record) => record.licensePlates.includes(value),

        },        {
            title: 'status',
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
                {
                    text: 'DOING',
                    value: 'DOING',
                }],filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value),
            sorter: (a, b) => a.status.length - b.status.length,
            sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            ellipsis: true,

        },        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
        },       {
            title: 'time Departure',
            dataIndex: 'timeDeparture',
            key: 'timeDeparture',
        },       {
            title: 'time Arrival',
            dataIndex: 'timeArrival',
            key: 'timeArrival',
        }, {
            title: 'time Return',
            dataIndex: 'timeReturn',
            key: 'timeReturn',
        }, {
            title: 'seat Quantity',
            dataIndex: 'seatQuantity',
            key: 'seatQuantity',
        },{
            title: 'arrival',
            dataIndex: `arrival`,
            key: 'arrival',
        },{
            title: 'departure',
            dataIndex: `departure`,
            key: 'departure',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, vehicleId) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => handleActive(vehicleId)}>
                    <a>Update status</a>
                </Popconfirm>

        },
    ];

    useEffect(() => {
        getVehicles();
    },[]);

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

    return<div>
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
        <Table columns={columns} dataSource={trips}  onChange={handleChange}/>;
        {isModalOpen && <TripForm
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}/>}

    </div>
};
export default CompanyTrip;