import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

import { Menu, Icon } from "antd";

const { SubMenu } = Menu;

const NavBar = () => {
  const [currentTab, setCurrentTab] = useState();
  const [credits, setCredits] = useState();

  useEffect(() => {
    getCredits();
  }, [currentTab]);

  const handleClick = ({ key }) => {
    setCurrentTab(key);
  };

  const getCredits = async () => {
    const username = Cookie.get("user") || null;
    if (username) {
      const response = await fetch(`/api/credit-by-user/${username}`);
      const data = await response.json();
      setCredits(data);
    }
    if (!username) {
      setCredits(0);
    }
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
      <Menu.Item>{credits} Creditos</Menu.Item>
    </Menu>
  );
};

export default NavBar;
