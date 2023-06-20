import React, { useState, useContext, useEffect} from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import "../css/styles.css";
import { array } from "./Products";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage, useFormikContext } from "formik";
import TextError from "./TextError";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../App";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import "../css/styles.css";
// import './FormDemo.css';

const AddProductForm = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const { setVisible,allProducts,setAllProducts } = useContext(StateContext);


  useEffect(() => {}, [imgUrl]);

  // FORMIK FORM INITIAL VALUES
  const initialValues = {
    id: "",
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    quantity: 1,
    stock: 10
  };
  // VALIDATION SCHEMA
  const validationSchema = Yup.object({
    id: Yup.string().required("Id is required"),
    title: Yup.string().required("title is necessary"),
    description: Yup.string().required("description is required"),
    price: Yup.string().required("price is required"),
    // thumbnail: Yup.string().required("image is required"),
  });

  // FORM SUBMIT FUNCTION
  const onSubmit = (values) => {
    const object = {
      id: values.id,
      title: values.title,
      description: values.description,
      price: values.price,
      thumbnail: imgUrl,
      quantity:values.quantity,
      stock:values.stock
    };
    allProducts.splice(allProducts.length, 0, object);
    localStorage.setItem("apiData", JSON.stringify(allProducts));
    setVisible(false);
    navigate("/");
  };

  // IMAGE UPLOAD HANDLER FUNCTION
  const imageHandler = (file) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.addEventListener("load", () => {
      const url = fr.result;
      setImgUrl(url);
    });
  };
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };
  
  return (
    
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
        
          <div className="flex justify-content-center">
            <div className="card">
            {console.log(formik)}
              <Form>
                <h5 className="text-center">Add Product Details</h5>

                <div className="field">
                  <Field
                    className="p-inputtext"
                    id="id"
                    type="number"
                    name="id"
                    autoFocus
                    placeholder="Id"
                  ></Field>

                  <ErrorMessage name="id" component={TextError}></ErrorMessage>
                </div>

                <div className="field">
                  <Field
                    className="p-inputtext"
                    id="title"
                    name="title"
                    placeholder="Title"
                  ></Field>
                  <ErrorMessage
                    name="title"
                    component={TextError}
                  ></ErrorMessage>
                </div>

                <div className="field">
                  <Field
                    className="p-inputtext"
                    id="description"
                    name="description"
                    placeholder="Description"
                  ></Field>
                  <ErrorMessage
                    name="description"
                    component={TextError}
                  ></ErrorMessage>
                </div>

                <div className="field">
                  <Field
                    className="p-inputtext"
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Price"
                  ></Field>
                  <ErrorMessage
                    name="price"
                    component={TextError}
                  ></ErrorMessage>
                </div>
                <div>
                  <img className="upload-img" src={imgUrl} />
                </div>

                <div className="field">
                  <span className="p-float-label">
                    <Field
                      id="thumbnail"
                      name="thumbnail"
                      type="file"
                      className="upload-button"
                      onChange={(e) => {
                        imageHandler(e.target.files[0]);
                      }}
                    ></Field>
                  </span>
                  <ErrorMessage
                    name="thumbnail"
                    component={TextError}
                  ></ErrorMessage>
                </div>
                <Button type="submit" className="mt-2">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default AddProductForm;
