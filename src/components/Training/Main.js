import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, CardContent, CardActions } from '@material-ui/core';
import useCardStyles from '../../Styles/Card';

export default function Main() {
  const classes = useCardStyles();

  const modules = [
    {
      name: 'Demanda de Inventario',
      link: '/entrenamientos/demanda-de-inventario',
      description:
        'Predice tus ventas del siguiente dia, semana, mes, trimestre o año. '
    }
  ];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        margin: '10px 20px'
      }}
    >
      {modules.map(m => (
        <Card
          title={m.name}
          style={{ width: 300 }}
          variant="outlined"
          className={classes.root}
        >
          <CardContent>
            <Typography className={classes.pos} color="textSecondary">
              {m.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Link size="medium" className={classes.anchor} to={m.link}>
              <Typography className={classes.title}>
                Click aqui para entrenar
              </Typography>
            </Link>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
