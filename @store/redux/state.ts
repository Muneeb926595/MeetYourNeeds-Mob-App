import { User } from "../../@models/User";
import { Product } from "../../@models/Product";

export {};
declare global {
  interface AuthState {
    user: User;
    cart: any[];
    loading?: boolean;
  }
  interface ProductState {
    products: Product[];
    loading?: boolean;
  }
}
