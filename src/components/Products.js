import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductItems from "./ProductItems";
import styled from "styled-components";
import { StateContext } from "../App";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = () => {
  const [data, setData] = useState([]);
  const {allProducts,setAllProducts}=useContext(StateContext)

  
  const getAllProducts = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setData(res.data);
        data.products.forEach((object) => {
          object.quantity = 1;
          object.stock = 10;
        });
  setAllProducts(data.products)
        localStorage.setItem("apiData", JSON.stringify(data.products));
      })
      .catch((err) => console.log(err));
  };

if (array){
  setAllProducts(array)
  // console.log('data from local storage')
}
else{
  getAllProducts()
  // console.log('data fetched from api')
}

  return (
    <Container>
      {allProducts.map((item) => (
        <ProductItems item={item} key={item.id} />
      ))}
    </Container>
   
  );
};

export const array = JSON.parse(localStorage.getItem("apiData"));
export default Products;
