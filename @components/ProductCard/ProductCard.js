import { Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Col, Box, Clickable, MyText } from "../../@uiComponents";
import cartIcon from "../../assets/cartIcon.png";
import addedToCartIcon from "../../assets/addedToCartIcon.png";
import { StorageHelper } from "../../@helpers";
import ProductImage from "../../@components/ProductImage/ProductImage";
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
        ht={`${wp(90)}px`}
        marg={`${wp(5)}px ${wp(5)}px ${wp(1.5)}px ${wp(5)}px`}
        hasRadius="6px"
        pad={`${wp(4)}px`}
      >
        <Col>
          <Clickable
            onPress={() => {
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
                width: wp(6),
                height: wp(6),
                borderRadius: 100,
                padding: wp(1),
                right: wp(2.5),
                top: wp(2),
              }}
              source={alreadyAddedToCart ? addedToCartIcon : cartIcon}
            />
          </Clickable>
          <MyText
            pad="0px"
            marg={`0 0 ${wp(1)}px 0`}
            size={`${RFValue(19)}px`}
            weight="400"
            spacing="-0.256px"
          >
            {item.category}
          </MyText>
          <MyText
            textTransform="capitalize"
            size={`${RFValue(15)}px`}
            weight="700"
            spacing="-0.9px"
          >
            {item.title}
          </MyText>
          <MyText
            marg={`${wp(1)}px 0 0 0`}
            color="rgba(0, 0, 0, 0.3)"
            pad="0px"
            size={`${RFValue(15)}px`}
            weight="400"
            spacing="-0.256px"
          >
            {item.description}
          </MyText>
          <MyText
            marg={`${wp(1)}px 0 0 0`}
            color="rgba(0, 0, 0, 0.3)"
            size={`${RFValue(14)}px`}
            weight="400"
            spacing="-0.256px"
          >
            Call Me At : {item.phoneNo}
          </MyText>
          <MyText
            marg={`${wp(1)}px 0 0 0`}
            color="#000000"
            size={`${RFValue(15)}px`}
            weight="400"
            spacing="-0.256px"
          >
            Rs. {item.price}
          </MyText>
        </Col>
        <ProductImage imageUrl={item.image} />
      </Box>
    </>
  );
};

export default ProductItem;
