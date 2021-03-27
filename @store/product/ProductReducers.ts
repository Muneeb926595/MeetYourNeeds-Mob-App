import { ProductActionTypes } from "../redux/actionTypes";

const INITIAL_STATE: ProductState = {
  products: [],
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const ProductReducer = (
  state: ProductState = INITIAL_STATE,
  action: Action
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.CREATE_PRODUCT_START: {
      return { ...state, loading: true };
    }
    case ProductActionTypes.CREATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    }
    case ProductActionTypes.CREATE_PRODUCT_FAIL: {
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    }

    case ProductActionTypes.GET_PRODUCTS_START: {
      return { ...state, loading: true };
    }
    case ProductActionTypes.GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    }
    case ProductActionTypes.GET_PRODUCTS_FAIL: {
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    }

    case ProductActionTypes.GET_PRODUCTS_BY_CATEGORY_START: {
      return { ...state, loading: true };
    }
    case ProductActionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS: {
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    }
    case ProductActionTypes.GET_PRODUCTS_BY_CATEGORY_FAIL: {
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};
export default ProductReducer;
