import React from "react";
import { Modal, Card } from "antd";
import { CircularProgress, Fab } from "@material-ui/core";
import { Check } from "@material-ui/icons";

export default ({
  handleOk,
  handleCancel,
  steps,
  currentStep,
  columns,
  fileHandler,
  data,
  width,
  isModelTrainingDone,
  isModelTrainingStarted,
  isDataTransformationDone,
  isDataTransformationStarted
}) => (
  <Modal
    visible
    onOk={handleOk}
    onCancel={handleCancel}
    width={width}
    centered
    okText="Siguiente"
    cancelText="Cancelar"
    closable={false}
    okButtonProps={{ disabled: !isModelTrainingDone }}
  >
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
      <Card title="Recoleccion de datos" style={{ width: 200 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Fab aria-label="save" color="primary">
            <Check />
          </Fab>
        </div>
      </Card>
      <Card title="Transformacion de datos" style={{ width: 200 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {isDataTransformationStarted && !isDataTransformationDone && (
            <CircularProgress></CircularProgress>
          )}
          {isDataTransformationDone && (
            <Fab aria-label="save" color="primary">
              <Check />
            </Fab>
          )}
          {!isDataTransformationStarted && !isDataTransformationDone && (
            <CircularProgress></CircularProgress>
          )}
        </div>
      </Card>
      <Card
        title="Entrenamiento del modelo de prediccion"
        style={{ width: 200 }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          {isModelTrainingStarted && !isModelTrainingDone && (
            <CircularProgress></CircularProgress>
          )}
          {isModelTrainingDone && (
            <Fab aria-label="save" color="primary">
              <Check />
            </Fab>
          )}
          {!isModelTrainingStarted && !isModelTrainingDone && (
            <CircularProgress></CircularProgress>
          )}
        </div>
      </Card>
    </div>
  </Modal>
);
