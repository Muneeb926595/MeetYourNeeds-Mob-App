import { Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Box, Clickable, MyText } from "../../@uiComponents";

import cartIcon from "../../assets/cartIcon.png";
import addedToCartIcon from "../../assets/addedToCartIcon.png";
import StorageHelper from "../../@helpers/StorageHelper";
import {
  addToCart,
  addToCartLocally,
  removeFromCartLocally,
  removeFromCart,
} from "../../@store/auth/AuthActions";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [alreadyAddedToCart, setAlreadyAddedToCart] = useState(false);

  const cartData = useSelector(({ MeedYourNeeds }) => MeedYourNeeds.auth.cart);

  useEffect(() => {
    const getUserId = async () => {
      const localUserId = await StorageHelper.getItem("userId");
      setUserId(localUserId);
    };

    getUserId();
  }, [StorageHelper]);

  useEffect(() => {
    cartData.map((singleProduct) => {
      if (item._id === singleProduct?.cart?._id) {
        setAlreadyAddedToCart(true);
      }
    });
  }, [item._id, cartData]);

  return (
    <>
      <Box
        bg="#ffffff"
        hasShadow="0px 0px 20px #dbdbdb"
        ht="40%"
        marg="20px 20px 6px 20px"
        hasRadius="6px"
        pad="16px"
      >
        <Col>
          <Clickable
            onClick={() => {
              if (!alreadyAddedToCart) {
                dispatch(addToCart(userId, item._id));
                dispatch(
                  addToCartLocally(
                    item._id,
                    item.title,
                    item.price,
                    item.description,
                    "http://localhost:3000/api/" + item.image,
                    item.category
                  )
                );
              } else {
                dispatch(removeFromCart(userId, item._id));
                dispatch(removeFromCartLocally(item._id));
              }
              setAlreadyAddedToCart(!alreadyAddedToCart);
            }}
          >
            <Image
              style={{
                position: "absolute",
                width: 24,
                height: 24,
                borderRadius: 100,
                padding: 4,
                right: 10,
                top: 8,
              }}
              source={alreadyAddedToCart ? addedToCartIcon : cartIcon}
            />
          </Clickable>
          <MyText
            pad="0px"
            mar="0 0 5px 0"
            size="20px"
            weight="400"
            spacing="-0.256px"
          >
            {item.category}
          </MyText>
          <MyText
            textTransform="capitalize"
            size="16px"
            weight="700"
            spacing="-0.9px"
          >
            {item.title}
          </MyText>
          <MyText
            mar="12px 0 0 0"
            color="rgba(0, 0, 0, 0.3)"
            pad="0px"
            size="16px"
            weight="400"
            spacing="-0.256px"
          >
            {item.description}
          </MyText>
          <MyText
            mar="8px 0 0 0"
            color="rgba(0, 0, 0, 0.3)"
            size="14px"
            weight="400"
            spacing="-0.256px"
          >
            Call Me At : {item.phoneNo}
          </MyText>
          <MyText
            mar="2px 0 0 0"
            color="#000000"
            size="16px"
            weight="400"
            spacing="-0.256px"
          >
            Rs. {item.price}
          </MyText>
        </Col>
        <Image
          style={{ borderRadius: 16, width: 100, height: 20, marginTop: 10 }}
          source={{ uri: "http://localhost:3000/api/" + item.image }}
        />
      </Box>
    </>
  );
};

export default ProductItem;
