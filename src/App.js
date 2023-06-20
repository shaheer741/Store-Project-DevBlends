import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { createContext, useEffect, useState,useRef } from "react";
import CheckoutMsg from "./pages/CheckoutMsg";
import { Toast } from 'primereact/toast';

function App() {
  const [quantity, setQuantity] = useState(0);
  const [stockQuantity,setStockQuantity]=useState(0)
  const [products, setProducts] = useState([]);
  const [cartitems, setCartitems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const myToast = useRef(null);
  
  const setProduct = (item) => {
    setProducts((prevProducts) => [...prevProducts, item]);
    localStorage.setItem("products", JSON.stringify([...products, item]));
  };
  const showSuccess=()=> {
    myToast.current.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
}
  const value = {
    cartitems,
    setCartitems,
    quantity,
    setQuantity,
    products,
    setProduct,
    setProducts,
    visible,
    setVisible,
    editVisible,
    setEditVisible,
    toggle,
    setToggle,
    showSuccess,
    allProducts,
    setAllProducts,
    stockQuantity,setStockQuantity
    // myToast
  };

  return (
    <StateContext.Provider value={value}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckoutMsg />} />
        </Routes>
      </BrowserRouter>
    </StateContext.Provider>
  );
}

export const StateContext = createContext({
  cartitems: [],
  setCartitems: () => {},
  products: [],
  setProducts: () => {},
  setProduct: () => {},
  quantity: 0,
  setQuantity: () => {},
  visible:false,
setVisible:()=>{},
  editVisible:false,
setEditVisible:()=>{},
  toggle:false,
setToggle:()=>{},
allProducts:[],
setAllProducts:()=>{},
stockQuantity:0,
setStockQuantity:()=>{},
// myToast:null,
showSuccess:()=>{}
});

export default App;
