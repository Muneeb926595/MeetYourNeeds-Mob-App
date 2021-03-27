export const BASE = "api end point";

export const loginUserUrl = () => {
  return encodeURI("auth/login");
};
export const registerUserUrl = () => {
  return encodeURI("auth/user");
};
export const getUserByIdUrl = (id) => {
  return encodeURI("auth/user/" + id);
};
export const getAddProductUrl = () => {
  return encodeURI("product");
};
export const getProductsUrl = () => {
  return encodeURI("product");
};
export const getProductsByCategoryUrl = (category) => {
  return encodeURI("product-by-category/" + category);
};
export const addOrderUrl = () => {
  return encodeURI("order");
};
export const addToCartUrl = () => {
  return encodeURI("auth/add-to-cart");
};
export const getCartUrl = (userId) => {
  return encodeURI("auth/get-cart/" + userId);
};
export const removeFromCartUrl = (userId, productId) => {
  return encodeURI("auth/remove-from-cart/" + userId + "/" + productId);
};
