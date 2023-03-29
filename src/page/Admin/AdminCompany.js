import { Popconfirm,message, Table,Space,Button,Input,Dropdown, Descriptions, Badge } from "antd";
import React, {  useRef, useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {HideLoading, ShowLoading} from "../../redux/alertsSlice";
import { SearchOutlined ,DownOutlined} from '@ant-design/icons';
import companyApi from "../../api/companyApi";
import adminApi from "../../api/adminApi";
import CompanyForm from "./Form/CompanyForm";

const AdminCompany = () => {
    const [comapnies, setComapies] = useState([]);
    // const {user}= useSelector(state => state.user);

    const dispatch = useDispatch();

    const getVehicles = async () => {
        try {
            const response = await adminApi.getAllCompany();

            console.log(response.data);

            if (response.data) {
                dispatch(ShowLoading());
                setComapies(response.data.list_data);
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
            const response = await adminApi.deleteCompany(record.companyId);

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
            title: 'company Id',
            dataIndex: 'companyId',
            key: 'companyId',
            sorter: (a, b) => a.companyId > b.companyId,
            sortOrder: sortedInfo.columnKey === 'companyId' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            filteredValue: [searchedText],
            onFilter: (value, record) => record.name.includes(value),

        },         {
            title: 'rating',
            dataIndex: 'rating',
            key: 'rating',
            width: '10%',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            sortDirections: ['descend', 'ascend'],  filters: [
                {
                    text: 'INACTIVE',
                    value: 'INACTIVE',
                },
                {
                    text: 'ACTIVE',
                    value: 'ACTIVE',
                }],filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status===value,
            sorter: (a, b) => a.status.length - b.status.length,
            sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            ellipsis: true,
        }, {
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
    const {user}= useSelector(state => state.user);

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
                Regis Company
            </button>
            {/*{comapnies.account.status}*/}
        </Space>
        <Table columns={columns} dataSource={comapnies}  onChange={handleChange}
             rowKey="companyId"

             expandable={{
                expandedRowRender: (record) => (
                    <Descriptions title="Info" layout="vertical" bordered>
                    <Descriptions.Item label="Date">{record.account.dataOfBirth}</Descriptions.Item>
                    <Descriptions.Item label="username">{record.account.username}</Descriptions.Item>
                    <Descriptions.Item label="firstname">{record.account.firstname}</Descriptions.Item>
                    <Descriptions.Item label="Allow edit before" span={2}>
                      {record.timeReturn}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                      <Badge status="processing" text={record.status} />
                    </Descriptions.Item>
                 
                    <Descriptions.Item label="Descriptions">
                      {record.description}
                    </Descriptions.Item>
                  </Descriptions>
                ),
                rowExpandable: (record) => record.name !== 'Not Expandable',
              }}
            
        
        />;
        {isModalOpen && <CompanyForm
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}/>}

    </div>
};
export default AdminCompany;