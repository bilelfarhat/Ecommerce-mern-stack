
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';



import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, Checkout, PageNotFound,ListAdmins,AddProduct ,ListUsers,AddAdmin,AddUser,ListProducts,Dashboard,AddCategorie,ListCategories} from "./pages"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
        <Route path="/listadmins" element={<ListAdmins />} />
        <Route path="/listusers" element={<ListUsers />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/addadmin" element={<AddAdmin />} />
        <Route path="/listproducts" element={<ListProducts />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addCategorie" element={<AddCategorie />} />
        <Route path="/listCategories" element={<ListCategories />} />

      </Routes>
    </Provider>
  </BrowserRouter>
);