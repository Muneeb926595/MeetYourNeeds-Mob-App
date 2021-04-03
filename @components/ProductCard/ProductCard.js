import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import cartIcon from "../../assets/cartIcon.png";
import addedToCartIcon from "../../assets/addedToCartIcon.png";
import { Clickable } from "../../@uiComponents";
import {
  addToCart,
  addToCartLocally,
  removeFromCartLocally,
  removeFromCart,
} from "../../@store/auth/AuthActions";

const ProductCard = styled.View`
  background-color: #ffffff;
  box-shadow: 0px 0px 20px #dbdbdb;
  height: 20pc;
  margin: 20px;
  margin-bottom: 6px;
  border-radius: 6px;
  padding: 16px;
`;
const ProductInfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const AddToCart = styled.Image`
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  padding: 4px;
  right: 10px;
  top: 8px;
`;
const ProductCategory = styled.Text`
  padding: 0px;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: -0.256px;
  line-height: 32px;
`;
const ProductName = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
  text-transform: capitalize;
  letter-spacing: -0.9px;
`;
const ProductDescription = styled.Text`
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 400;
  font-size: 18px;
  letter-spacing: -0.256px;
  line-height: 32px;
`;
const ProductPrice = styled.Text`
  margin-top: 2px;
  font-weight: 400;
  font-size: 20px;
  color: #000000;
  letter-spacing: -0.256px;
  line-height: 32px;
`;
const ProductImage = styled.Image`
  border-radius: 16px;
  width: 100%;
  height: 10pc;
  object-fit: cover;
  margin-top: 10px;
`;

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const [alreadyAddedToCart, setAlreadyAddedToCart] = useState(false);

  const cartData = useSelector(({ MeedYourNeeds }) => MeedYourNeeds.auth.cart);

  useEffect(() => {
    cartData.map((singleProduct) => {
      if (item._id === singleProduct?.cart?._id) {
        setAlreadyAddedToCart(true);
      }
    });
  }, [item._id, cartData]);

  return (
    <>
      <ProductCard>
        <ProductInfoContainer>
          <Clickable
            onClick={() => {
              if (!alreadyAddedToCart) {
                dispatch(addToCart(item._id));
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
                dispatch(removeFromCart(item._id));
                dispatch(removeFromCartLocally(item._id));
              }
              setAlreadyAddedToCart(!alreadyAddedToCart);
            }}
          >
            <AddToCart
              source={{ uri: alreadyAddedToCart ? addedToCartIcon : cartIcon }}
            />
          </Clickable>
          <ProductCategory>{item.category}</ProductCategory>
          <ProductName>{item.title}</ProductName>
          <ProductDescription>{item.description}</ProductDescription>
          <ProductPrice>Rs. {item.price}</ProductPrice>
        </ProductInfoContainer>
        <ProductImage
          source={{ uri: "http://localhost:3000/api/" + item.image }}
        />
      </ProductCard>
    </>
  );
};

export default ProductItem;
