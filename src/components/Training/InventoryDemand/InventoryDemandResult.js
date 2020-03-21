import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import TableControl from "../../Controls/Table";

const columns = ["item", "store", "amount"];

export default ({ onCancel, onOk, model }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const loadResult = async () => {
      const response = await fetch(
        `/api/v1/inventory-demand/result/${model._id}`
      );
      const newData = await response.json();
      setData(newData);
    };
    loadResult();
  }, [model._id]);

  return (
    <Modal visible onOk={onCancel} onCancel={onCancel} centered okText="Ok  ">
      <TableControl data={data} columns={columns} rowsPerPage={5} />
    </Modal>
  );
};
