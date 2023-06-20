import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Heading = styled.h1`
  color: #88b04b;
  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;
const Message = styled.p`
  color: #404f5e;
  font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
  font-size: 20px;
  margin: 0;
  display: flex;
  justify-content: center;
`;
const Icon = styled.i`
  color: #9abc66;
  font-size: 100px;
  line-height: 200px;
  margin-left: -15px;
  display: flex;
  justify-content: center;
`;
const Card = styled.div`
  background: white;
  padding: 60px;
  border-radius: 4px;
  box-shadow: 0 2px 3px #c8d0d8;
  display: inline-block;
  margin: 0 auto;
`;
const Bcontainer = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
`;
const ShopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  display: flex;
`;

const CheckoutMsg = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Card>
        <Icon class="checkmark">✓</Icon>
        <Heading>Success</Heading>
        <Message>
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </Message>
        <Bcontainer>
          <ShopButton onClick={() => navigate("/")}>
            CONTINUE SHOPPING
          </ShopButton>
        </Bcontainer>
      </Card>
    </Container>
  );
};

export default CheckoutMsg;
