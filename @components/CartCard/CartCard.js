import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import {
  removeFromCart,
  removeFromCartLocally,
} from "../../@store/auth/AuthActions";
import StorageHelper from "../../@helpers/StorageHelper";
import { Clickable } from "../../@uiComponents";
import deleteIcon from "../../assets/deleteIcon.png";

const ProductRowContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0px ${wp(3)}px;
  justify-content: space-between;
  margin-bottom: ${wp(4)}px;
`;
const ProductInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ProductImageContainer = styled.View`
  width: ${wp(11.5)}px;
  height: ${wp(11.5)}px;
  margin-right: ${wp(2)}px;
`;
const ProductDetails = styled.View`
  display: flex;
  flex-direction: column;
`;
const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  box-shadow: 0px 0px 8px #dbdbdb;
`;
const ProductName = styled.Text`
  margin: 0;
  text-transform: capitalize;
  font-weight: 500;
  font-size: ${RFValue(17)}px;
`;
const ProductPrice = styled.Text`
  margin: 0;
  font-weight: 300;
  font-size: ${RFValue(17)}px;
`;
const RemoveProduct = styled.View`
  padding: ${wp(2)}px ${wp(2.5)}px;
  border-radius: 6px;
  border: 1px solid red;
`;
const DeleteIcon = styled.Image`
  width: ${wp(6)}px;
  height: ${wp(6)}px;
`;

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const getUserId = async () => {
      const localUserId = await StorageHelper.getItem("userId");
      setUserId(localUserId);
    };

    getUserId();
  }, []);
  const handleRemoveProduct = () => {
    dispatch(removeFromCart(userId, item.cart._id));
    dispatch(removeFromCartLocally(item.cart._id));
  };

  return (
    <ProductRowContainer>
      <ProductInfo>
        <ProductImageContainer>
          <ProductImage
            source={{ uri: "http://localhost:3000/api/" + item.cart.image }}
          />
        </ProductImageContainer>
        <ProductDetails>
          <ProductName>{item.cart.title}</ProductName>
          <ProductPrice>Rs. {item.cart.price}</ProductPrice>
        </ProductDetails>
      </ProductInfo>
      <RemoveProduct>
        <Clickable onClick={handleRemoveProduct}>
          <DeleteIcon source={deleteIcon} />
        </Clickable>
      </RemoveProduct>
    </ProductRowContainer>
  );
};

export default ProductItem;
