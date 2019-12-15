import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Icon } from "antd";
import moment from "moment";

export default () => {
  const [trainedModels, setTrainedModels] = useState([]);
  useEffect(() => {
    loadTrainedModels();
  }, []);

  const loadTrainedModels = async () => {
    const response = await fetch("/api/trained_models/escruz");
    const data = await response.json();
    setTrainedModels(data);
  };

  const getDate = date => {
    return `${moment().date(date)}/${moment().month(date)}/${moment().year(
      date
    )}`;
  };

  const predict = async modelName => {
    const request = {
      model: modelName,
      user: "escruz"
    };
    await fetch("api/predict", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json"
      }
    });
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
                onClick={() => predict(m.type)}
              />
            ]}
          >
            <p>{m.type}</p>
            <p>{getDate(m.create_time)}</p>
            <p>Meses a predecir: {m.model_details.months_to_predict}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
};
