import React, { useState } from "react";
import { Card, Button, Modal } from "antd";
import PaypalExpressBtn from "react-paypal-express-checkout";

const client = {
  sandbox:
    "AQ-1Nvfl1nklh5yp8BaxS-O95m_EmB_GQ9MAgxNbOOBSMyMY_QiIB9GCxBT_E7PmpL1mVhG6t5wztruQ",
  production:
    "AQ-1Nvfl1nklh5yp8BaxS-O95m_EmB_GQ9MAgxNbOOBSMyMY_QiIB9GCxBT_E7PmpL1mVhG6t5wztruQ"
};

const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox";

function Shop() {
  const [paid, setPaid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const packages = [
    {
      amount: 500,
      savingAmount: 0,
      price: 50
    },
    {
      amount: 1250,
      savingAmount: 250,
      price: 100
    }
  ];

  const onPaymentSucces = response => {
    setPaid(response.paid);
    setIsModalOpen(true);
    const request = {};
    debugger;
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        margin: "10px 20px"
      }}
    >
      {packages.map(p => (
        <Card
          title={`$${p.price.toFixed(2)}`}
          style={{ width: 300, fontSize: 18 }}
          theme="dark"
        >
          <p>{p.amount} Monedas</p>
          <PaypalExpressBtn
            client={client}
            currency={"USD"}
            total={p.price.toFixed(2)}
            onSuccess={onPaymentSucces}
            disable={true}
            disabled={true}
          />
        </Card>
      ))}
      {isModalOpen && (
        <Modal
          visible
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        >
          {paid && <h2>Exito! Se ha completado el pago!</h2>}
          {!paid && (
            <h2>Algo sucedio y no se completo el pago, intente de nuevo. </h2>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Shop;
