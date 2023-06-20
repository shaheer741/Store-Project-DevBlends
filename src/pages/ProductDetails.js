import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { array } from "../components/Products";
import { useParams, useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useContext } from "react";
import { StateContext } from "../App";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
`;
const ImgContainer = styled.div`
  flex: 1;
  padding: 10px;
  margin-top: 20px;
  height: 500px;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 20px;
  height: 500px;
  background-color: #f5fbfd;
`;
const Image = styled.img`
height: 500px;
width: max-content;



`;

const Title = styled.h1`
  font-weight: 200;
  margin-top: 0;
`;
const Desc = styled.p`
  min-height: 200px;
`;
const Price = styled.span`
  font-size: 40px;
  font-weight: 200;
`;
const QuantityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-top: 10px;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LeftItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
`;
const Right = styled.div``;

const Quantity = styled.div`
  width: 25px;
  height: 25px;
  border: solid 1px teal;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 35%;
`;
const Button = styled.button`
  padding: 10px;
  border: 2px solid teal;
  cursor: pointer;
  &:hover {
    background-color: #f8f4f4;
  }
`;
const Stock=styled.div`
`;
const ProductDetails = () => {
  const { quantity, setQuantity, setProduct, setProducts, products,allProducts,setAllProducts,stockQuantity,setStockQuantity } =
    useContext(StateContext);
    const[newStockValue,setNewStockValue]=useState(0)
  let { id } = useParams();
  const navigate = useNavigate();
// setAllProducts(prevArray=>array)
// setStockQuantity(prevQuantity=>array[itemIndex].stock)
// console.log(stockQuantity)

  useEffect(()=>{

// // setStockQuantity(array[itemIndex].stock);
// // setStockQuantity(array[itemIndex].stock);

// console.log('all products', allProducts)
},[])

// console.log('all products', allProducts)

// FIND INDEX
const itemIndex = array.findIndex((item) => {
  return item.id == id;
});
// // STOCK MANAGMENT
const decrementStock=()=>{
  const PrevObject = array.find(
    (item) => item.id == id
  )
  const testValue=stockQuantity-quantity
  setStockQuantity(testValue)
  console.log('prev  product',PrevObject)
  const UpdatedObject = {
    ...PrevObject,
    stock:testValue
  
  };
  console.log('updated product',UpdatedObject)
  const tempArray=[...array]
  console.log('temp array',tempArray)
  tempArray.splice(itemIndex, 1, UpdatedObject);
  console.log('temp array after slicing',tempArray)
  localStorage.setItem("apiData", JSON.stringify(tempArray));
  
}

  // ADD TO CART FUNCTION //
  const addProduct = () => {
    // console.log('stock quantity',stockQuantity)
if ( quantity<=array[itemIndex].stock)
{

  const searchObject = products.find(
  (item) => item.id == id
);
// console.log('search object',searchObject)
if (searchObject) {
  const updatedProduct = {
    ...searchObject,
    quantity: searchObject.quantity + quantity,
  };
 

//  console.log('updated product',updatedProduct)
  const cartItemIndex=products.findIndex((item)=>{return item.id==searchObject.id})
  const copyArray=[...products]
  copyArray.splice(cartItemIndex,1)
  copyArray.push(updatedProduct)
  // const updatedProducts = products.map((item) => {
  //   if (item.id === searchObject.id) {
  //     return updatedProduct;
  //   } else {
  //     return item;
  //   }
  // });
  setProducts(copyArray);
  localStorage.setItem("products", JSON.stringify(copyArray));
  setQuantity(0);
  // decrementStock();
  navigate("/cart");
}
else {
  
  // console.log('test Value',testValue)
  // setNewStockValue(testValue)
  // console.log('new stock value',newStockValue)
  decrementStock();
  const updatedProduct = {
    ...array[itemIndex],
    quantity: quantity,
    // stock: allProducts[itemIndex].stock-quantity
  };
  setProduct(updatedProduct);

  // decrementStock();
  setQuantity(0);
  navigate("/cart");
}
}
else{
  window.alert("Not enough items in stock");
}
;}
// DECREMENT QUANTITY FUNCTION
  const decrementQuantity = () => {
    quantity > 0 ? setQuantity(quantity - 1) : setQuantity(quantity);
  };
  // INCREMENT QUANTITY FUNCTION
  const incrementQuantity = () => {
    
      setQuantity(quantity+1);
    
      // setStockQuantity(prevQuantity=>prevQuantity-quantity)
      // console.log(stockQuantity)
    
  }
    


  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={array[itemIndex].thumbnail} />
        </ImgContainer>
        <InfoContainer>
          <Title>{array[itemIndex].title}</Title>
          <Desc>{array[itemIndex].description}</Desc>
          <Price>RS {array[itemIndex].price}</Price>
          <Stock>Items in stock = {stockQuantity}</Stock>
          <QuantityContainer>
            <Left>
              <LeftItems>
                <i
                  className="pi pi-minus"
                  style={{ color: "#008080" }}
                  onClick={() => decrementQuantity()}
                ></i>
              </LeftItems>
              <LeftItems>
                <Quantity>{quantity}</Quantity>
              </LeftItems>
              <LeftItems>
                <i
                  className="pi pi-plus"
                  style={{ color: "#008080" }}
                  // onClick={() => setQuantity(quantity + 1)}
                  onClick={() => incrementQuantity()}
                ></i>
              </LeftItems>
            </Left>
            <Right>
              <Button
                onClick={() => {
                  addProduct();
                }}
                disabled={quantity<1}
              >
                ADD TO CART
              </Button>
            </Right>
          </QuantityContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default ProductDetails;
