import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const CardToBuy = () => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Product details
          </Card.Text>
          <Button variant="primary">Message</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardToBuy;
