import React, { useState, useContext } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "../css/styles.css";
import { array } from "./Products";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { StateContext } from "../App";

const EditForm = (props) => {
  const [imgUrl, setImgUrl] = useState("");
  const { toggle, setToggle,allProducts,setAllProducts } = useContext(StateContext);


  // DESTRUCTURING PROPS
  const { itemId, state, changeState } = props;

  // FIND OBJECT WITH GIVEN ID
  const searchObject = allProducts.find((item) => item.id == itemId);

  // FORMIK FORM INITIAL VALUES
  const initialValues = {
    id: searchObject.id,
    title: searchObject.title,
    description: searchObject.description,
    price: searchObject.price,
    thumbnail: "",
    prevImage: searchObject.thumbnail,
    quantity: 1,
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
      thumbnail: imgUrl || values.prevImage,
    };
    const itemIndex = allProducts.findIndex((item) => {
      return item.id == values.id;
    });
    setAllProducts(allProducts.splice(itemIndex, 1, object));
    localStorage.setItem("apiData", JSON.stringify(allProducts));
    changeState(false);
    // setToggle(!toggle);
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <div className="flex justify-content-center">
          <div className="card">
            <Form>
              <h5 className="text-center">Edit Product Details</h5>

              <div className="field">
                <Field
                  id="id"
                  name="id"
                  type="number"
                  autofocus
                  className="p-inputtext"
                  placeholder="Id"
                ></Field>
                <ErrorMessage name="id" component={TextError}></ErrorMessage>
              </div>

              <div className="field">
                <Field
                  id="title"
                  name="title"
                  className="p-inputtext"
                  placeholder="Title"
                ></Field>
                <ErrorMessage name="title" component={TextError}></ErrorMessage>
              </div>

              <div className="field">
                <Field
                  id="description"
                  name="description"
                  className="p-inputtext"
                  placeholder="Description"
                ></Field>
                <ErrorMessage
                  name="description"
                  component={TextError}
                ></ErrorMessage>
              </div>

              <div className="field">
                <Field
                  id="price"
                  name="price"
                  type="number"
                  className="p-inputtext"
                  placeholder="IPrice"
                ></Field>
                <ErrorMessage name="price" component={TextError}></ErrorMessage>
              </div>

              <div>
                <img className="upload-img" src={imgUrl} />
              </div>

              <div className="field">
                <Field
                  id="thumbnail"
                  name="thumbnail"
                  type="file"
                  className="upload-button"
                  onChange={(e) => {
                    imageHandler(e.target.files[0]);
                  }}
                ></Field>
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
      )}
    </Formik>
  );
};

export default EditForm;
