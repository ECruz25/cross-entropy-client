import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Spin } from "antd";
import moment from "moment";
import InventoryDemandResult from "./InventoryDemandResult";

export default () => {
  const [trainedModels, setTrainedModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingResults, setIsShowingResults] = useState(false);
  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    loadTrainedModels();
  }, []);

  const loadTrainedModels = async () => {
    const response = await fetch("/api/trained_models/escruz");
    const data = await response.json();
    setIsLoading(false);
    setTrainedModels(data);
  };

  const getDate = date => {
    return `${moment().date(date)}/${moment().month(date)}/${moment().year(
      date
    )}`;
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        margin: "10px 20px"
      }}
    >
      {trainedModels.map(m => (
        <Link to={m.link}>
          <Card
            title={m.type}
            style={{ width: 300 }}
            theme="dark"
            actions={[
              <Icon
                type="fund"
                key="predecir"
                onClick={() => {
                  setIsShowingResults(true);
                }}
              />
            ]}
          >
            {m.model_details && (
              <>
                <p>{m.type}</p>
                <p>{getDate(m.create_time)}</p>
                <p>Meses a predecir: {m.model_details.months_to_predict}</p>
              </>
            )}
          </Card>
        </Link>
      ))}
      {isLoading && (
        <div style={{ margin: "50%", justifySelf: "center" }}>
          <Spin></Spin>
        </div>
      )}
      {isShowingResults && (
        <InventoryDemandResult
          onCancel={() => {
            setIsShowingResults(false);
          }}
        ></InventoryDemandResult>
      )}
    </div>
  );
};
