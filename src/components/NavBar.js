import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Menu, Icon } from "antd";

const { SubMenu } = Menu;

const NavBar = () => {
  const [currentTab, setCurrentTab] = useState();

  const handleClick = ({ key }) => {
    setCurrentTab(key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[currentTab]} mode="horizontal">
      <Menu.Item key="main">
        <Link to="/">cross-entropy</Link>
      </Menu.Item>
      <Menu.Item key="training">
        <Link to="/entrenamientos">
          <Icon type="schedule" />
          Entrenar un nuevo algoritmo
        </Link>
      </Menu.Item>
      <Menu.Item key="schedule">
        <Link to="/predicciones">
          <Icon type="schedule" />
          Algoritmos listos
        </Link>
      </Menu.Item>
      <Menu.Item key="app">
        <Link to="/resultados">
          <Icon type="line-chart" />
          Resultados
        </Link>
      </Menu.Item>
      <Menu.Item key="shop">
        <Link to="/tienda">
          <Icon type="shopping-cart" />
          Tienda
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
