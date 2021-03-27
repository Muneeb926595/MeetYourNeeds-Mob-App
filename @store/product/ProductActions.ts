import {
  getAddProductUrl,
  getProductsUrl,
  getProductsByCategoryUrl,
} from "../../@api/Endpoint";
import { ProductActionTypes } from "../redux/actionTypes";
import { axiosInstance as axios } from "../../@api/axios";
import { Product } from "../../@models/Product";

export const addNewProduct = (product: Product) => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.CREATE_PRODUCT_START,
    });

    const url = getAddProductUrl();
    let formData = new FormData();
    for (let key in product) {
      if (key === "imageFile" && product[key] != null) {
        formData.append(key, product[key], product[key].name);
      } else {
        formData.append(key, product[key]);
      }
    }
    axios
      .post(url, formData)
      .then((res) => {
        let { data } = res;
        if (data) {
          addNewProductuccess(dispatch, data);
        } else {
          createPostFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        createPostFail(dispatch, "There was an error connection2");
      });
  };
};
const createPostFail = (dispatch, errorMessage) => {
  dispatch({
    type: ProductActionTypes.CREATE_PRODUCT_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const addNewProductuccess = (dispatch, data) => {
  dispatch({
    type: ProductActionTypes.CREATE_PRODUCT_SUCCESS,
    payload: data,
  });
  dispatch(getProducts());
};

export const getProducts = () => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.GET_PRODUCTS_START,
    });
    const url = getProductsUrl();
    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          getProductsSuccess(dispatch, data);
        } else {
          getProductsFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        getProductsFail(dispatch, "There was an error connection2");
      });
  };
};
const getProductsFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: ProductActionTypes.GET_PRODUCTS_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getProductsSuccess = (dispatch, data) => {
  dispatch({
    type: ProductActionTypes.GET_PRODUCTS_SUCCESS,
    payload: data,
  });
};

export const getProductsByCategory = (category) => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.GET_PRODUCTS_BY_CATEGORY_START,
    });
    const url = getProductsByCategoryUrl(category);
    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          getProductsByCategorySuccess(dispatch, data);
        } else {
          getProductsByCategoryFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        getProductsByCategoryFail(dispatch, "There was an error connection2");
      });
  };
};
const getProductsByCategoryFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: ProductActionTypes.GET_PRODUCTS_BY_CATEGORY_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getProductsByCategorySuccess = (dispatch, data) => {
  dispatch({
    type: ProductActionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS,
    payload: data,
  });
};
