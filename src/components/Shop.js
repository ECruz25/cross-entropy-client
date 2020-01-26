import React, { useState } from "react";
import { Card, Button, Modal } from "antd";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { PayPalButton } from "react-paypal-button-v2";
import Cookie from "js-cookie";
const client = {
  sandbox:
    "AQ-1Nvfl1nklh5yp8BaxS-O95m_EmB_GQ9MAgxNbOOBSMyMY_QiIB9GCxBT_E7PmpL1mVhG6t5wztruQ",
  production:
    "AQ-1Nvfl1nklh5yp8BaxS-O95m_EmB_GQ9MAgxNbOOBSMyMY_QiIB9GCxBT_E7PmpL1mVhG6t5wztruQ"
};

const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox";

function Shop() {
  const [paid, setPaid] = useState(false);
  const [isGoingToPay, setIsGoingToPay] = useState(false);
  const [chosenPaymentAmount, setChosenPaymentAmount] = useState("");
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

  const onPaymentSucces = async (response, p2) => {
    setPaid(response.paid);
    setIsModalOpen(true);
    const request = {
      username: Cookie.get("user"),
      paymentId: response.paymentID,
      amount: packages.filter(t => t.price === chosenPaymentAmount)[0].amount,
      dollarAmount: chosenPaymentAmount
    };
    const requestResponse = await fetch("/api/create-transaction", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(request)
    });

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
          key={p.amount}
        >
          <p>{p.amount} Monedas</p>
          <Button
            onClick={async () => {
              setIsGoingToPay(true);
              setChosenPaymentAmount(p.price);
            }}
          >
            Pagar
          </Button>
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
      {isGoingToPay && (
        <Modal
          visible
          onOk={() => setIsGoingToPay(false)}
          onCancel={() => setIsGoingToPay(false)}
        >
          <h4 style={{ alignSelf: "center", justifySelf: "center" }}>
            Despues de dar click, se le redirigira al sitio de Paypal donde
            podra hacer su pago
          </h4>
          <PaypalExpressBtn
            client={client}
            currency={"USD"}
            total={chosenPaymentAmount}
            onSuccess={onPaymentSucces}
          />
        </Modal>
      )}
    </div>
  );
}

export default Shop;
