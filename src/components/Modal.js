import React, { useContext } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AddProductForm from "./AddProductForm";
import { StateContext } from "../App";

const Modal = () => {
  
  const { visible, setVisible } = useContext(StateContext);

  return (
    <div className="card flex justify-content-center">
      <Button
        label="Add Product"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Add New Product"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <AddProductForm />
      </Dialog>
    </div>
  );
};

export default Modal;
