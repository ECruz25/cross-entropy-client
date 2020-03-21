import React, { useEffect, useState } from "react";
import { BarChart } from "@material-ui/icons";
import {
  Card,
  CircularProgress,
  CardActions,
  IconButton,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Grid
} from "@material-ui/core";
import moment from "moment";
import InventoryDemandResult from "./Training/InventoryDemand/InventoryDemandResult";
import useCardStyles from "../Styles/Card";
import useGridStyles from "../Styles/Card";
import Cookie from "js-cookie";

export default () => {
  const cardClasses = useCardStyles();
  const gridClasses = useGridStyles();
  const [trainedModels, setTrainedModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [selectedModel, setSelectedModel] = useState({});
  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    loadTrainedModels();
  }, []);

  const loadTrainedModels = async () => {
    const email = await Cookie.get("user");

    const response = await fetch(`/api/v1/trained_models/${email}`);
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
    <>
      <Grid container className={gridClasses.root} spacing={1}>
        <Grid container justify="center" spacing={1}>
          {trainedModels.map(m => (
            <Grid item>
              <Card key={m.created_time} variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={cardClasses.avatar}>
                      R
                    </Avatar>
                  }
                  title={m.type}
                  subheader={`Entrenado ${getDate(m.create_time)}`}
                />
                <CardContent>
                  <Typography>
                    Dias a predecir:{" "}
                    {m.model_details && (
                      <>{Math.ceil(m.model_details.months_to_predict * 30)}</>
                    )}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="share"
                    onClick={() => {
                      setIsShowingResults(true);
                      setSelectedModel(m);
                    }}
                  >
                    <BarChart />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {isLoading && (
        <div style={{ margin: "50%", justifySelf: "center" }}>
          <CircularProgress></CircularProgress>
        </div>
      )}
      {isShowingResults && (
        <InventoryDemandResult
          model={selectedModel}
          onCancel={() => {
            setIsShowingResults(false);
          }}
        ></InventoryDemandResult>
      )}
    </>
  );
};
