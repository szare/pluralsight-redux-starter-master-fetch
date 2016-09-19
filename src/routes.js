import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import ProductsPage from "./components/product/ProductsPage";
import ManageProductsPage from "./components/product/ManageProductPage";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="products" component={ProductsPage}/>
    <Route path="product" component={ManageProductsPage}/>
    <Route path="product/:ID" component={ManageProductsPage}/>
    <Route path="about" component={AboutPage}/>
  </Route>
);
