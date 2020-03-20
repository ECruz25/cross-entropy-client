import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { BarChart, MultilineChart } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(2);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Modelos"
        icon={<MultilineChart />}
        component={Link}
        to="/entrenamientos"
      />
      <BottomNavigationAction
        label="Resultados"
        icon={<BarChart />}
        component={Link}
        to="/resultados"
      />
      <BottomNavigationAction
        label="Configuracion"
        icon={<SettingsIcon />}
        component={Link}
        to="/configuraciones"
      />
    </BottomNavigation>
  );
}
