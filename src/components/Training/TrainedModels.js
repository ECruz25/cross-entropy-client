import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@material-ui/core";
import { ShowChart } from "@material-ui/icons";
import moment from "moment";
import useCardStyles from "../../Styles/Card";

export default () => {
  const classes = useCardStyles();
  const [trainedModels, setTrainedModels] = useState([]);
  useEffect(() => {
    loadTrainedModels();
  }, []);

  const loadTrainedModels = async () => {
    const response = await fetch("/api/v1/trained_models/escruz");
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
    await fetch("api/v1/predict", {
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
        <Card
          className={classes.root}
          title={m.type}
          style={{ width: 300 }}
          theme="dark"
          actions={[
            <ShowChart
              type="fund"
              key="predecir"
              onClick={() => predict(m.type)}
            />
          ]}
        >
          <CardContent>
            <Typography className={classes.pos} color="textSecondary">
              {m.description}
            </Typography>
          </CardContent>
          {m.model_details && (
            <>
              <p>{m.type}</p>
              <p>{getDate(m.create_time)}</p>
              <p>
                Dias a predecir:{" "}
                {Math.ceil(m.model_details.months_to_predict * 30)}
              </p>
            </>
          )}
        </Card>
      ))}
    </div>
  );
};
