import React from "react";
import styled from "styled-components";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../App";
import { useContext, useEffect } from "react";
import Modal from "./Modal";

const Container = styled.div`
  height: 50px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eff3f8;
`;
const Left = styled.div`
  display: flex;
`;
const LeftItems = styled.div`
  font-size: 15px;
  margin-left: 10px;
`;
const Language = styled.div`
  cursor: pointer;
`;
const Input = styled.input`
  border: solid 1px;
  height: 15px;
`;
const Search = styled.div`
  cursor: pointer;
  margin-top: 2px;
`;
const Center = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #6366f1;
`;
const Right = styled.div`
  cursor: pointer;
  display: flex;
`;
const MenuItems = styled.div`
  font-size: 10px;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { cartitems, setCartitems, products } = useContext(StateContext);
  const storedProducts = JSON.parse(localStorage.getItem("products"));
  useEffect(() => {
    setCartitems(storedProducts);
  }, [products]);
  return (
    <Container>
      <Left>
        <LeftItems>
          <Language>EN</Language>
        </LeftItems>
        <LeftItems>
          <Input />
        </LeftItems>
        <LeftItems>
          <Search>
            <i
              className="pi pi-search"
              style={{ color: "var(--primary-color)" }}
            ></i>
          </Search>
        </LeftItems>
      </Left>
      <Center>Store Project</Center>
      <Right>
      <MenuItems>
        <Modal/>
        </MenuItems>
        <MenuItems>
          <Button icon="pi pi-shopping-cart" onClick={() => navigate("/cart")}>
            <Badge value={cartitems.length} />
          </Button>
        </MenuItems>
        
      </Right>
    </Container>
  );
};

export default Navbar;
