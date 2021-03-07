import { User } from "./User";
export interface Product {
  _id?: String;
  userId?: User;
  title?: String;
  description?: String;
  image?: String;
  time?: String;
  category?: String;
}
