import * as types from "./actionTypes";
import productApi from "../components/api/productApi";

import {beginAjaxCall,ajaxCallError} from "./ajaxStatusActions";

export function loadProductsSuccess(products) {
  return {type: types.LOAD_PRODUCTS_SUCCESS, products};
}

export function createProductSuccess(product) {
  return {type: types.CREATE_PRODUCT_SUCCESS, product};
}

export function updateProductSuccess(product) {
  return {type: types.UPDATE_PRODUCT_SUCCESS, product};
}

export function deleteProductSuccess(productId)
{
  return {type: types.DELETE_PRODUCT_SUCCESS,productId};
}


export function loadProducts() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return productApi.getAllProducts().then(products=> {
      dispatch(loadProductsSuccess(products));
    }).catch(error=> {
      throw(error);
    });
  };
}


export function saveProduct(product) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return productApi.saveProduct(product).then(saveProduct => {
      product.ID ? dispatch(updateProductSuccess(saveProduct)) :
        dispatch(createProductSuccess(saveProduct));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}


export function deleteProduct(productId)
{
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return productApi.deleteProduct(productId).then(
      dispatch(deleteProductSuccess(productId))
    ).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
