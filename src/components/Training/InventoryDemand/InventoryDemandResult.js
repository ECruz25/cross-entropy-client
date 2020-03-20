import React, { useEffect, useState } from "react";
import { Modal, Steps, Select, Typography, InputNumber } from "antd";
import TableControl from "../../Controls/Table";

const { Title } = Typography;
const { Step } = Steps;
const { Option } = Select;

const columns = ["item", "store", "amount"];

export default ({ onCancel, onOk, model }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    loadResult();
  }, []);

  const loadResult = async () => {
    const response = await fetch(
      `/api/v1/inventory-demand/result/${model._id}`
    );
    const newData = await response.json();
    debugger;
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
      <TableControl data={data} columns={columns} rowsPerPage={5} />
    </Modal>
  );
};
