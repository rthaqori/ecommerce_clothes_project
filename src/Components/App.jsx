import React from "react";
import Signup from "./LoginSignup/Signup";
import { AuthProvider } from "./Contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./LoginSignup/Login";
import PrivateRoute from "./PrivateRoute";
import Home from "./HomeComponents/Home";
import Shop from "./ShopComponents/Shop";
import ProductPage from "./ProductPageComponents/ProductPage";
import WishList from "./WishListComponents/WishList";
import Cart from "./CartComponents/Cart";
import CheckoutPage from "./CheckoutComponents/CheckoutPage";
import Products from "./DashboardComponents/Products";
import Users from "./DashboardComponents/Users";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/admin/products"
            element={<PrivateRoute element={<Products />} />}
          />
          <Route
            path="/admin/users"
            element={<PrivateRoute element={<Users />} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/wishList" element={<WishList />} />
          <Route path="/cartList" element={<Cart />} />
          ``
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
