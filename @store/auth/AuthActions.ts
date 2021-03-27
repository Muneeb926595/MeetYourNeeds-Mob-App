import AsyncStorage from "@react-native-community/async-storage";

import {
  getUserByIdUrl,
  loginUserUrl,
  addToCartUrl,
  removeFromCartUrl,
  getCartUrl,
  addOrderUrl,
  registerUserUrl,
} from "../../@api/Endpoint";
import { axiosInstance as axios } from "../../@api/axios";
import { AuthActionTypes } from "../redux/actionTypes";
import { User } from "../../@models/User";
import { getProducts } from "../product/ProductActions";

const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {}
};

export const submitLogin = (user: User, navigation) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.LOGIN_USER_START,
    });
    const request = {
      email: user.userName,
      password: user.password,
    };
    const url = loginUserUrl();
    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (
          data.accessToken &&
          data.accessToken !== "undefined" &&
          data._id &&
          data._id !== "undefined"
        ) {
          loginUserSuccess(dispatch, data, navigation);
        } else {
          loginUserFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error?.response?.data) {
          alert(error.response.data);
        }
        loginUserFail(dispatch, "There was an error connection2");
      });
  };
};
const loginUserFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.LOGIN_USER_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const loginUserSuccess = (dispatch, data, navigation) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + data.accessToken;
  _storeData("access_token", data.accessToken);
  _storeData("userId", data._id);
  dispatch({
    type: AuthActionTypes.LOGIN_USER_SUCCESS,
    payload: data,
  });
  navigation.navigate("Navigation");
};

export const submitRegister = (user: User, navigation) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.CREATE_USER_START,
    });
    const request = {
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      password: user.password,
    };
    const url = registerUserUrl();

    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (
          data.accessToken &&
          data.accessToken !== "undefined" &&
          data._id &&
          data._id !== "undefined"
        ) {
          registerUserSuccess(dispatch, data, navigation);
        } else {
          registerUserFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error?.response?.data) {
          alert(error.response.data);
        }

        registerUserFail(dispatch, "There was an error connection2");
      });
  };
};
const registerUserFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.CREATE_USER_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const registerUserSuccess = (dispatch, data, navigation) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + data.accessToken;
  _storeData("access_token", data.accessToken);
  _storeData("userId", data._id);
  dispatch({
    type: AuthActionTypes.CREATE_USER_SUCCESS,
    payload: data,
  });
  navigation.navigate("Navigation");
};
export const getUser = (id) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.GET_USER_START,
    });

    const url = getUserByIdUrl(id);
    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data._id && data._id !== "undefined") {
          getUserSuccess(dispatch, data);
        } else {
          getUserFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        getUserFail(dispatch, "There was an error connection2");
      });
  };
};
const getUserFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.GET_USER_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getUserSuccess = (dispatch, data) => {
  dispatch({
    type: AuthActionTypes.GET_USER_SUCCESS,
    payload: data,
  });
};

export const addToCart = (productId) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.ADD_TO_CART_START,
    });

    const url = addToCartUrl();
    const request = {
      userId: localStorage.getItem("userId"),
      productId: productId,
    };
    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (data) {
          addToCartSuccess(dispatch, data);
        } else {
          addToCartFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        addToCartFail(dispatch, "There was an error connection2");
      });
  };
};
const addToCartFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.ADD_TO_CART_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const addToCartSuccess = (dispatch, data) => {
  dispatch({
    type: AuthActionTypes.ADD_TO_CART_SUCCESS,
    payload: data,
  });
};

export const getCart = (productId) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.GET_CART_START,
    });

    const url = getCartUrl(localStorage.getItem("userId"));
    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          getCartSuccess(dispatch, data);
        } else {
          getCartFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        getCartFail(dispatch, "There was an error connection2");
      });
  };
};
const getCartFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.GET_CART_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getCartSuccess = (dispatch, data) => {
  dispatch({
    type: AuthActionTypes.GET_CART_SUCCESS,
    payload: data,
  });
};
export const removeFromCart = (productId) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.REMOVE_FROM_CART_START,
    });

    const url = removeFromCartUrl(localStorage.getItem("userId"), productId);
    axios
      .delete(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          removeFromCartSuccess(dispatch, data);
        } else {
          removeFromCartFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        removeFromCartFail(dispatch, "There was an error connection2");
      });
  };
};
const removeFromCartFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.REMOVE_FROM_CART_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const removeFromCartSuccess = (dispatch, data) => {
  dispatch({
    type: AuthActionTypes.REMOVE_FROM_CART_SUCCESS,
    payload: data,
  });
};

export const addOrder = ({ products, paymentMethod }, setShowCheckoutModal) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.ADD_ORDER_START,
    });

    const url = addOrderUrl();

    const request = {
      userId: localStorage.getItem("userId"),
      products: products,
      paymentMethod: paymentMethod.creditCard
        ? "creditCard"
        : paymentMethod.paypal
        ? "paypal"
        : "cash",
    };

    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (data) {
          addOrderSuccess(dispatch, data, setShowCheckoutModal);
        } else {
          addOrderFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        addOrderFail(dispatch, "There was an error connection2");
      });
  };
};
const addOrderFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.ADD_ORDER_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const addOrderSuccess = (dispatch, data, setShowCheckoutModal) => {
  dispatch({
    type: AuthActionTypes.ADD_ORDER_SUCCESS,
    payload: data,
  });
  dispatch(getProducts());
  setShowCheckoutModal(false);
};

export const addToCartLocally = (
  productId,
  productTitle,
  productPrice,
  productDescription,
  productImage,
  productCategory
) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.ADD_TO_CART_LOCALLY,
      payload: {
        cart: {
          _id: productId,
          title: productTitle,
          price: productPrice,
          description: productDescription,
          image: productImage,
          category: productCategory,
        },
      },
    });
  };
};

export const removeFromCartLocally = (productId) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.REMOVE_FROM_CART_LOCALLY,
      payload: productId,
    });
  };
};
