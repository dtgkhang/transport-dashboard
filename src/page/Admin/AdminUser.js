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
import adminApi from "../../api/adminApi";
function AdminUser() {

    const [vehicles, setVehicles] = useState([]);
const { user } = useSelector((state) => state.user);

const dispatch = useDispatch();
//Refesh
const [refreshKey, setRefreshKey] = useState(0);


const getBooked = async () => {
  try {
    const response = await adminApi.getAllUser();

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

const columns = [
  {
    title: "UserId",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id > b.id,
    sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    width: "20%",
    filteredValue: [searchedText],
    onFilter: (value, record) => record.username.includes(value),
  }, {
    title: "email",
    dataIndex: "email",
    key: "email",
    width: "20%",
    filteredValue: [searchedText],
    onFilter: (value, record) => record.email.includes(value),
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: "20%",
    filters: [
      {
        text: "USER",
        value: "USER",
      },
      {
        text: "COMPANY",
        value: "COMPANY",
      },
    ],
    filteredValue: filteredInfo.role || null,
    onFilter: (value, record) => record.role.includes(value),
    sorter: (a, b) => a.role.length - b.role.length,
    sortOrder:
      sortedInfo.columnKey === "role" ? sortedInfo.order : null,
    ellipsis: true,
  },
  {
    title: "phone",
    dataIndex: "phone",
    key: "phone",
    width: "20%",
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
      },
    ],
    filteredValue: filteredInfo.status || null,
    onFilter: (value, record) => record.status === value,
    sorter: (a, b) => a.status.length - b.status.length,
    sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
    ellipsis: true,
  },

];

useEffect(() => {
    getBooked();
//   console.log("Booked ", vehicles.status);
}, [refreshKey]);

    return (

          <div>
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

export default AdminUser