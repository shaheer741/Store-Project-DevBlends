import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "../css/styles.css";
import { array } from "./Products";
import { Dialog } from "primereact/dialog";
import EditForm from "./EditForm";
import { StateContext } from "../App";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 220px;
  height: 300px;
  display: flex;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
`;
const Image = styled.img`
  height: 180px;
  width: fit-content;
`;
const CardContainer = styled.div`
  cursor: pointer;
`;
// useEffect=(()=>{

// },[])

const ProductItems = ({ item, productKey }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const {
    toggle,
    setToggle,
    myToast,
    showSuccess,
    allProducts,
    setAllProducts,
    setStockQuantity,stockQuantity
  } = useContext(StateContext);

  // FUNCTION FOR DELETING PRODUCT
  // const deleteProduct = (id) => {

  //   const itemIndex = array.products.findIndex((item) => {
  //     return item.id == id;
  //   });
  //   array.products.splice(itemIndex, 1);

  //   localStorage.setItem("apiData", JSON.stringify(array));
  //   setToggle(!toggle);

  // };
  const deleteProduct = (id) => {
    const itemIndex = allProducts.findIndex((item) => {
      return item.id == id;
    });
      allProducts.splice(itemIndex, 1);
      setAllProducts((prevArray) => [...prevArray, allProducts]);
      localStorage.setItem("apiData", JSON.stringify(allProducts));
    // showSuccess()
  };

  // EDIT BUTTON FUNCTION
  const editProduct = (id) => {
    setVisible(true);
  };

  // MODAL CLOSE FUNCTION
  const closeModal = () => {
    setVisible(false);
  };
 // GOTO PRODUCT DETAILS FUNCTION
const gotoProduct=()=>{
  // const itemIndex = array.findIndex((item) => {
  //   return item.id == item.id;
  // });
  // setStockQuantity(array[itemIndex].stock);
  // console.log(stockQuantity)
  
  navigate(`/productdetails/${item.id}`)
}

  // CARD HEADER
  const header = (
    <Image
      alt="Product thumbnail"
      src={item.thumbnail}
      // onClick={() => navigate(`/productdetails/${item.id}`)}
      onClick={() => gotoProduct()}
    />
  );

  // CARD FOOTER
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        label="Edit"
        icon="pi pi-check"
        onClick={() => editProduct(item.id)}
      />
      <Dialog
        header="Edit Product"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => closeModal()}
      >
        <EditForm itemId={item.id} state={visible} changeState={setVisible} />
      </Dialog>
      <Button
        label="Delete"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={() => {
          deleteProduct(item.id);
        }}
      />
    </div>
  );

  return (
    <Container key={productKey}>
      <CardContainer>
        <Card
          title={item.title}
          subTitle={`Rs ${item.price}`}
          header={header}
          footer={footer}
        ></Card>
      </CardContainer>
    </Container>
  );
};

export default ProductItems;
