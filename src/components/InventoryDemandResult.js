import React, { useEffect, useState } from "react";
import { Modal, Steps, Select, Typography, InputNumber } from "antd";
import TableControl from "./TableControl";

const { Title } = Typography;
const { Step } = Steps;
const { Option } = Select;

const columns = [
  {
    title: "store",
    dataIndex: "store",
    key: "store"
  },
  {
    title: "item",
    dataIndex: "item",
    key: "item"
  },
  {
    title: "amount",
    dataIndex: "amount",
    key: "amount"
  }
];

export default ({ onCancel, onOk, id }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {
    const response = await fetch(`/api/inventory-demand/result/${id}`);
    const newData = await response.json();
    setData(newData);
  };
  return (
    <Modal
      visible
      onOk={onOk}
      onCancel={onCancel}
      centered
      okText="Siguiente"
      cancelText="Cancelar"
      closable={false}
    >
      <TableControl data={data} columns={columns} />
    </Modal>
  );
};
