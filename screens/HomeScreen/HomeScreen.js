import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";

import AddNewProduct from "../../@components/AddNewProduct/AddNewProduct";
import CustomModal from "../../@components/CustomModal";
import StorageHelper from "../../@helpers/StorageHelper";
import { getProducts } from "../../@store/product/ProductActions";
import Loader from "../../@components/Loader/Loader";
import ProductCard from "../../@components/ProductCard/ProductCard";
import { getCart } from "../../@store/auth/AuthActions";
import addIcon from "../../assets/addIcon.png";

const AddProduct = styled.TouchableOpacity`
  box-shadow: 0px 0px 14px #007aff;
  background-color: #007aff;
  height: 50px;
  width: 50px;
  position: absolute;
  z-index: 100;
  bottom: 24px;
  right: 24px;
  elevation: 10;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;
const AddIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  const productsData = useSelector(
    ({ MeedYourNeeds }) => MeedYourNeeds.product.products
  );
  const productsLoading = useSelector(
    ({ MeedYourNeeds }) => MeedYourNeeds.product.loading
  );
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    const getUserId = async () => {
      const localUserId = await StorageHelper.getItem("userId");
      setUserId(localUserId);
    };

    getUserId();
  }, []);
  useEffect(() => {
    if (userId !== "") {
      dispatch(getCart(userId));
    }
  }, [userId]);
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
            height: 100,
            width: 100,
          }}
        >
          <Loader />
        </View>
      ) : (
        <>
          <AddProduct
            onPress={() => {
              setShowModal(true);
            }}
          >
            <AddIcon source={addIcon} />
          </AddProduct>
          <FlatList
            data={productsData}
            renderItem={({ item }) => <ProductCard item={item} />}
            keyExtractor={(item) => item._id}
            keyboardShouldPersistTaps="handled"
          />
        </>
      )}

      <CustomModal
        height={560}
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <AddNewProduct />
      </CustomModal>
    </>
  );
};

export default HomeScreen;
