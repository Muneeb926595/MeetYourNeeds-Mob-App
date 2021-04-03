import { AuthActionTypes } from "./../redux/actionTypes";
const INITIAL_STATE: AuthState = {
  user: {},
  cart: [],
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const AuthReducer = (
  state: AuthState = INITIAL_STATE,
  action: Action
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER_START: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.LOGIN_USER_FAIL: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.CREATE_USER_START: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.CREATE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.CREATE_USER_FAIL: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.ADD_TO_CART_START: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.ADD_TO_CART_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.ADD_TO_CART_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.GET_CART_START: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.GET_CART_SUCCESS: {
      return {
        ...state,
        cart: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.GET_CART_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.REMOVE_FROM_CART_START: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.REMOVE_FROM_CART_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.REMOVE_FROM_CART_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.ADD_ORDER_START: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.ADD_ORDER_SUCCESS: {
      return {
        ...state,
        cart: [],
        loading: false,
      };
    }
    case AuthActionTypes.ADD_TO_CART_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.ADD_TO_CART_LOCALLY: {
      return {
        ...state,
        cart: [...state.cart, action.payload],
        loading: false,
      };
    }
    case AuthActionTypes.REMOVE_FROM_CART_LOCALLY: {
      const tempCartProducts = state.cart.filter(
        (singleProduct) =>
          singleProduct.cart._id.toString() !== action.payload.toString()
      );
      return {
        ...state,
        cart: tempCartProducts,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};
export default AuthReducer;
