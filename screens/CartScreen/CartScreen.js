import React from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import CartCard from "../../@components/CartCard/CartCard";
import { Button } from "../../@uiComponents";
import { addOrder } from "../../@store/auth/AuthActions";

const Checkout = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  justify-content: center;
  border-top-width: 1px;
  margin-top: 10px;
  border-color: #dbdbdb;
`;

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(({ MeedYourNeeds }) => MeedYourNeeds.auth.cart);
  return (
    <View style={{ marginTop: "20px" }}>
      <FlatList
        data={cartData}
        renderItem={({ item }) => <CartCard item={item} />}
        keyExtractor={(item) => item._id}
        keyboardShouldPersistTaps="handled"
      />
      <Checkout>
        <Button
          text="Confirm Order"
          bgColor="#007aff"
          disabled={!(cartData.length > 0)}
          onClick={() =>
            dispatch(
              addOrder({
                products: cartData?.map(({ cart }) => {
                  return cart._id;
                }),
                paymentMethod: "mobile",
              })
            )
          }
        />
      </Checkout>
    </View>
  );
};

export default CartScreen;
