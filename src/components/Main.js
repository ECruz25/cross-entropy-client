import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon } from "antd";

export default function Main() {
  const modules = [
    {
      name: "Demanda de Inventario",
      link: "/entrenamientos/demanda-de-inventario",
      description:
        "Predice tus ventas a del siguiente dia, semana, mes, trimestre o año. "
    }
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        margin: "10px 20px"
      }}
    >
      {modules.map(m => (
        <Link to={m.link}>
          <Card title={m.name} style={{ width: 300 }} theme="dark">
            <p>{m.description}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
