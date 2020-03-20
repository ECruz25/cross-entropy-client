import React, { useState, Fragment, useEffect } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import { Button } from "antd";
import ExcelLoaderControl from "../../Controls/ExcelLoaderControl";
import InventoryDemandVariablePicker from "./InventoryDemandVariablePicker";
import Training from "../Training";
import moment from "moment";

const steps = [
  { key: 0, name: "Seleccion de prediccion" },
  { key: 1, name: "Seleccion de datos" },
  { key: 2, name: "Seleccion de variables" },
  { key: 3, name: "Prediccion de demanda" }
];

const modalWidth = 800;

const getJsDateFromExcel = excelDate => {
  const tryMoment = moment(
    new Date((excelDate - (25567 + 1)) * 86400 * 1000)
  ).format("L");
  if (!moment(new Date((excelDate - (25567 + 1)) * 86400 * 1000)).isValid()) {
    return excelDate;
  }
  return tryMoment;
};

export default () => {
  const [data, setData] = useState([]);
  const [dateVariable, setDateVarible] = useState("");
  const [salesVariable, setSalesVariable] = useState("");
  const [storeIdVariable, setStoreIdVariable] = useState("");
  const [itemIdVariable, setItemIdVariable] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [columns, setColumns] = useState([]);
  const [monthsToPredict, setMonthsToPredict] = useState(3);
  const [isDataTransformationDone, setIsDataTransformationDone] = useState(
    false
  );
  const [isModelTrainingStarted, setIsModelTrainingStarted] = useState(false);
  const [isModelTrainingDone] = useState(false);
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    if (dateVariable && currentStep === 3 && !isDataTransformationDone) {
      const setDateInData = data.map(row => ({
        ...row,
        date: getJsDateFromExcel(row[dateVariable])
      }));
      setData(setDateInData);
    }
  }, [currentStep, data, dateVariable]);

  useEffect(() => {
    if (currentStep === 3 && isModelTrainingStarted) {
      handleTrainData();
    }
  }, [isModelTrainingStarted]);

  useEffect(() => {
    if (data.length > 0) {
      setColumns(Object.keys(data[0]));
    }
  }, [data]);

  useEffect(() => {
    if (currentStep === 3 && !isDataTransformationDone) {
      handleSendDataRecollection();
    }
  }, [currentStep, isDataTransformationDone]);

  const start = () => {
    setCurrentStep(1);
  };

  const fileHandler = event => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        const newColumns = resp.rows[0];
        const dataColumns = resp.rows[0].map((col, index) => ({
          name: col,
          index: index + 1,
          title: col,
          dataIndex: col,
          key: col
        }));
        resp.rows.shift();
        const dataRows = resp.rows.map(row =>
          Object.assign(
            {},
            ...dataColumns.map(column => ({
              [column.name]: row[column.index - 1]
            }))
          )
        );
        setData(dataRows);
        setColumns(newColumns);
      }
    });
  };

  const handleOk = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleCancel = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSendDataRecollection = async () => {
    const request = {
      data: data.map(row => ({
        item: row[itemIdVariable],
        sales: row[salesVariable],
        date: row[dateVariable],
        store: row[storeIdVariable]
      })),
      monthsToPredict,
      user: "escruz"
    };

    const response = await fetch("/api/v1/inventory-demand/model-training", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(request)
    });
    const newd = await response.json();
    debugger;
    setTransformedData(newd);
    setIsDataTransformationDone(true);
    setIsModelTrainingStarted(true);
  };

  const handleTrainData = async () => {
    const response = await fetch("/api/v1/inventory-demand/model-training", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ ...transformedData, user: "escruz" })
    });
    debugger;
  };

  const renderSteps = () => {
    switch (currentStep) {
      case 0:
        return <Button onClick={start}>Empezar</Button>;
      case 1:
        return (
          <ExcelLoaderControl
            steps={steps}
            currentStep={currentStep}
            handleOk={handleOk}
            handleCancel={handleCancel}
            columns={columns}
            fileHandler={fileHandler}
            data={data}
            width={modalWidth}
          />
        );
      case 2:
        return (
          <InventoryDemandVariablePicker
            columns={columns}
            steps={steps}
            currentStep={currentStep}
            handleOk={handleOk}
            handleCancel={handleCancel}
            width={modalWidth}
            dateVariable={dateVariable}
            salesVariable={salesVariable}
            storeIdVariable={storeIdVariable}
            itemIdVariable={itemIdVariable}
            setDateVarible={setDateVarible}
            setSalesVariable={setSalesVariable}
            setStoreIdVariable={setStoreIdVariable}
            setItemIdVariable={setItemIdVariable}
            monthsToPredict={monthsToPredict}
            setMonthsToPredict={setMonthsToPredict}
          />
        );
      case 3:
        return (
          <Training
            columns={columns}
            steps={steps}
            currentStep={currentStep}
            handleOk={handleOk}
            handleCancel={handleCancel}
            width={modalWidth}
            isDataTransformationDone={isDataTransformationDone}
            isDataTransformationStarted={true}
            isModelTrainingDone={isModelTrainingDone}
            isModelTrainingStarted={isModelTrainingStarted}
          />
        );
      default:
        break;
    }
  };

  return <Fragment>{renderSteps()}</Fragment>;
};
