import {
  getAddProductUrl,
  getProductsUrl,
  getProductsByCategoryUrl,
} from "../../@api/Endpoint";
import { ProductActionTypes } from "../redux/actionTypes";
import { axiosInstance as axios } from "../../@api/axios";
import { Product } from "../../@models/Product";

export const addNewProduct = (product: Product, navigation) => {
  const categoryList = ["Face", "Lip", "Eye", "Skincare", "Other"];
  return (dispatch) => {
    if (!categoryList.includes(product.category.toString())) {
      return alert("Catergory Must Be: (Face,Lip,Eye,Skincare,Other)");
    }

    let isPriceNo = /^\d+$/.test(product.price.toString());
    let isPhoneNoNo = /^\d+$/.test(product.phoneNo.toString());
    if (!isPriceNo) {
      return alert("Price Must Not Contains Alphabets");
    }
    if (!isPhoneNoNo) {
      return alert("Phone No Is Invalid");
    }
    dispatch({
      type: ProductActionTypes.CREATE_PRODUCT_START,
    });
    const url = getAddProductUrl();
    let formData = new FormData();
    for (let key in product) {
      if (key === "imageFile" && product[key] != null) {
        const fileName = product["imageFile"].uri.split("/");
        formData.append(
          key,
          {
            uri: product[key].uri,
            type: product[key].type,
            name: fileName[fileName.length - 1],
          },
          fileName[fileName.length - 1]
        );
      } else {
        formData.append(key, product[key]);
      }
    }
    axios
      .post(url, formData)
      .then((res) => {
        let { data } = res;
        if (data) {
          addNewProductuccess(dispatch, data, navigation);
        } else {
          addNewProductFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        addNewProductFail(dispatch, "There was an error connection2");
      });
  };
};
const addNewProductFail = (dispatch, errorMessage) => {
  dispatch({
    type: ProductActionTypes.CREATE_PRODUCT_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const addNewProductuccess = (dispatch, data, navigation) => {
  dispatch({
    type: ProductActionTypes.CREATE_PRODUCT_SUCCESS,
    payload: data,
  });
  navigation.navigate("Home");
  dispatch(getProducts());
};

export const getProducts = () => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.GET_PRODUCTS_START,
    });
    const url = getProductsUrl();
    console.log("geeting products from ", url);
    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        console.log("got this", data);
        if (data.length) {
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
