import React from "react";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../App";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Container = styled.div``;

const Wrapper = styled.div``;

const Title = styled.h1`
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 0px 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const Bottom = styled.div`
  display: flex;
  padding: 20px;
  margin: 0px 20px;
`;
const Info = styled.div`
  display: flex;
  min-width: 700px;
  justify-content: space-between;
  background-color: #f1f3f4;
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-right: 20px;
`;
const ProductDetails = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`;
const Text = styled.h3`
  margin-right: 10px;
  font-size: 18px;
  margin: 5px 0px;
`;
const Detail = styled.span`
  font-weight: 200;
`;
const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const QuantityBlock = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const QuantityItem = styled.div`
  font-size: 24px;
  padding: 10px;
`;
const Icon = styled.i`
  cursor: pointer;
`;
const Price = styled.span`
  font-weight: 200;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Hr = styled.hr``;

const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  height: 50vh;
  padding: 10px;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const Heading = styled.span``;

const Value = styled.span``;

const Button = styled.button`
  padding: 10px;
  width: 100%;
  margin-top: 20px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: black;
  color: white;
`;

const Cart = () => {
  const {
    products,
    cartitems,
    setProducts,
  } = useContext(StateContext);
  const [newvalue, setNewvalue] = useState([]);

  const navigate = useNavigate();
  const checkoutFunc = () => {
    products.length = 0;
    cartitems.length = 0;
    localStorage.removeItem("products");
    localStorage.setItem("products",JSON.stringify( []));
    navigate("/checkout");
  };

  let totalPrice = 0;
  newvalue.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    setNewvalue(storedProducts);
  }, []);

  const increaseQuantity = (key) => {
    const searchObject = newvalue.find((item) => item.id == key);
    const updatedProduct = {
      ...searchObject,
      quantity: searchObject.quantity + 1,
    };
    const updatedProducts = newvalue.map((item) => {
      if (item.id === searchObject.id) {
        return updatedProduct;
      } else {
        return item;
      }
    });
    setNewvalue(updatedProducts);
    // console.log('updated products',updatedProducts)
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    // console.log('products',products)
  };
  const decreaseQuantity = (key,quantity) => {
    if(quantity>1){
    const searchObject = newvalue.find((item) => item.id == key);
      const updatedProduct = {
        ...searchObject,
        quantity: searchObject.quantity - 1,
      };
      const updatedProducts = newvalue.map((item) => {
        if (item.id === searchObject.id) {
          return updatedProduct;
        } else {
          return item;
        }
      });
      setNewvalue(updatedProducts);
      // console.log('updated products',updatedProducts)
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      // console.log('products',products)
      
    }
  };

  return (
    <Container>
      <Title>YOUR BAG</Title>
      <Top>
        <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
        <TopButton
          type="filled"
          onClick={() => {
            checkoutFunc();
          }}
        >
          CHECKOUT NOW
        </TopButton>
      </Top>
      {newvalue.map((item, index) => (
        <Wrapper key={index}>
          <Bottom>
            <Info>
              <ProductInfo>
                <Image src={item.thumbnail} />
                <ProductDetails>
                  <Text>
                    Product:<Detail> {item.title}</Detail>
                  </Text>
                </ProductDetails>
              </ProductInfo>

              <PriceInfo>
                <QuantityBlock>
                  <QuantityItem>Quantity:</QuantityItem>
                  <QuantityItem>
                    <Icon
                      className="pi pi-minus"
                      style={{ color: "#008080" }}
                      onClick={() => {
                        decreaseQuantity(item.id,item.quantity);
                      }}
                    ></Icon>
                  </QuantityItem>
                  <QuantityItem>{item.quantity}</QuantityItem>

                  <QuantityItem>
                    <Icon
                      className="pi pi-plus"
                      style={{ color: "#008080" }}
                      onClick={() => {
                        increaseQuantity(item.id);
                      }}
                    ></Icon>
                  </QuantityItem>
                </QuantityBlock>
                <Price>RS {item.price}</Price>
              </PriceInfo>
            </Info>
          </Bottom>
          <Hr />
        </Wrapper>
      ))}
      <Summary>
        <SummaryTitle>ORDER SUMMARY</SummaryTitle>

        <SummaryItem type="total">
          <Heading>Total:</Heading>
          <Value>RS {totalPrice}</Value>
        </SummaryItem>
        <Button
          onClick={() => {
            checkoutFunc();
          }}
        >
          CHECKOUT NOW
        </Button>
      </Summary>
    </Container>
  );
};

export default Cart;
