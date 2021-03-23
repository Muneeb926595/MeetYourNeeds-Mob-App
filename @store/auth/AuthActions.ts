import AsyncStorage from "@react-native-community/async-storage";

import { loginUserUrl, registerUserUrl } from "../../@api/Endpoint";
import { axiosInstance as axios } from "../../@api/axios";
import { AuthActionTypes } from "../redux/actionTypes";
import { User } from "../../@models/User";

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
