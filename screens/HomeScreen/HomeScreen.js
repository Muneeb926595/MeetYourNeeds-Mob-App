import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, View } from "react-native";

import { getProducts } from "../../@store/product/ProductActions";
import Loader from "../../@components/Loader/Loader";
import ProductCard from "../../@components/ProductCard/ProductCard";
import { getCart } from "../../@store/auth/AuthActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productsData = useSelector(
    ({ MeedYourNeeds }) => MeedYourNeeds.product.products
  );
  const productsLoading = useSelector(
    ({ MeedYourNeeds }) => MeedYourNeeds.product.loading
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCart());
  }, []);
  return (
    <>
      {productsLoading ? (
        <View
          style={{
            position: "absolute",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Loader />
        </View>
      ) : (
        <FlatList
          data={productsData}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={(item) => item._id}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </>
  );
};

export default HomeScreen;
