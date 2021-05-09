import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import CartCard from "../../@components/CartCard/CartCard";
import { MyButton } from "../../@uiComponents";
import { addOrder } from "../../@store/auth/AuthActions";
import StorageHelper from "../../@helpers/StorageHelper";

const Checkout = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${wp(2.5)}px ${wp(5)}px;
  width: 100%;
  justify-content: center;
  border-top-width: 1px;
  margin-top: ${wp(2.5)}px;
  border-color: #dbdbdb;
`;

const CartScreen = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const cartData = useSelector(({ MeedYourNeeds }) => MeedYourNeeds.auth.cart);

  useEffect(() => {
    const getUserId = async () => {
      const localUserId = await StorageHelper.getItem("userId");
      setUserId(localUserId);
    };

    getUserId();
  }, []);
  return (
    <View style={{ marginTop: wp(5) }}>
      <FlatList
        data={cartData}
        renderItem={({ item }) => <CartCard item={item} />}
        keyExtractor={(item) => item._id}
        keyboardShouldPersistTaps="handled"
      />
      <Checkout>
        <MyButton
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
                userId: userId,
              })
            )
          }
        />
      </Checkout>
    </View>
  );
};

export default CartScreen;
