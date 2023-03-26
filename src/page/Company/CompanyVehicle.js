import {
  Popconfirm,
  message,
  Table,
  Space,
  Button,
  Input,
  Dropdown,
} from "antd";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VehicleForm from "./Form/VehicleForm";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import Highlighter from "react-highlight-words";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import companyApi from "../../api/companyApi";

const CompanyVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  //Refesh
  const [refreshKey, setRefreshKey] = useState(0);


  const getVehicles = async () => {
    try {
      const response = await companyApi.getVehicleByCompanyId(user.companyId);

      console.log(response.data);

      if (response.data) {
        setVehicles(response.data.list_vehicle);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error("Can not get vehicle or no vehicle");
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
  const handleActive = async (record) => {
    try {
      console.log(record);
      const response = await companyApi.updateActive(record.vehicleId);

      console.log(response.data);
      setRefreshKey(oldKey => oldKey +1)

      if (response.data) {
        message.success(response.data.message);
        // window.location.reload(false);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  const columns = [
    {
      title: "vehicleId",
      dataIndex: "vehicleId",
      key: "vehicleId",
      width: "10%",
      sorter: (a, b) => a.vehicleId > b.vehicleId,
      sortOrder: sortedInfo.columnKey === "vehicleId" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "License",
      dataIndex: "licensePlates",
      key: "licensePlates",
      width: "20%",
      filteredValue: [searchedText],
      onFilter: (value, record) => record.licensePlates.includes(value),
    },
    {
      title: "Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
      width: "20%",
      filters: [
        {
          text: "BUS",
          value: "BUS",
        },
        {
          text: "LIMOUSINE",
          value: "LIMOUSINE",
        },
      ],
      filteredValue: filteredInfo.vehicleType || null,
      onFilter: (value, record) => record.vehicleType.includes(value),
      sorter: (a, b) => a.vehicleType.length - b.vehicleType.length,
      sortOrder:
        sortedInfo.columnKey === "vehicleType" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "seat Capacity",
      dataIndex: "seatCapacity",
      key: "seatCapacity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sortDirections: ["descend", "ascend"],
      filters: [
        {
          text: "INACTIVE",
          value: "INACTIVE",
        },
        {
          text: "ACTIVE",
          value: "ACTIVE",
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
      render: (_, vehicleId) => (
        <Popconfirm
          title="Sure to change?"
          onConfirm={() => handleActive(vehicleId)}
        >
          <a>Update status</a>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    getVehicles();
    console.log("vehicle ", vehicles.status);
  }, [refreshKey]);

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
        <button className="btn btn-primary" onClick={showModal}>
          Add Vehicle
        </button>
      </Space>
      <Table columns={columns} dataSource={vehicles} onChange={handleChange} />;
      {isModalOpen && (
        <VehicleForm
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          setRefresh={setRefreshKey}
          
        />
      )}
    </div>
  );
};
export default CompanyVehicle;
