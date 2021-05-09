import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import ImagePicker from "react-native-image-crop-picker";
import { RFValue } from "react-native-responsive-fontsize";
import { Image, TouchableNativeFeedback } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Clickable, Col, Row, MyButton, MyText } from "../../@uiComponents";
import addMediaIcon from "../../assets/addMediaIcon.png";
import StorageHelper from "../../@helpers/StorageHelper";
import { addNewProduct } from "../../@store/product/ProductActions";

const StyledInput = styled.TextInput`
  width: 100%;
  height: ${(props) => props.ht};
  padding: 0 ${wp(2)}px;
  border-radius: 10px;
  margin-bottom: ${wp(5)}px;
  border: 1px solid #dbdbdb;
`;

const ButtonContainer = styled.View`
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

const AddNewProduct = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (description === "" || price === "" || !userId) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [description, file, userId]);

  useEffect(() => {
    const getUserId = async () => {
      const localUserId = await StorageHelper.getItem("userId");
      setUserId(localUserId);
    };

    getUserId();
  }, []);

  const handleImagePick = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
    }).then(async (image) => {
      let crop = await ImagePicker.openCropper({
        path: image.path,
        width: 800,
        height: 800,
        compressImageMaxWidth: 800,
        compressImageMaxHeight: 800,
      });
      crop = { ...crop, uri: image.sourceURL, filename: image.filename };
      setFile(crop);
    });
  };

  return (
    <Col bg="#ffffff" wid="100%" pad={`${wp(5)}px`}>
      <StyledInput
        ht={`${wp(10)}px`}
        placeholder="Name of product"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <StyledInput
        ht={`${wp(10)}px`}
        placeholder="Price ???"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <StyledInput
        ht={`${wp(10)}px`}
        placeholder="Cell phone no"
        value={phoneNo}
        onChangeText={(text) => setPhoneNo(text)}
      />
      <StyledInput
        ht={`${wp(17.5)}px`}
        placeholder="Write description here"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <StyledInput
        ht={`${wp(10)}px`}
        placeholder="Category (Face,Lip,Eye,Skincare,Other)"
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
      <Row noFlex between center>
        <MyText
          weight="700"
          size={`${RFValue(11)}px`}
          textTransform="capitalize"
        >
          Add to your post
        </MyText>
        {Platform.OS === "android" ? (
          <TouchableNativeFeedback
            onClick={() => {
              handleImagePick();
            }}
          >
            <Image
              source={addMediaIcon}
              style={{ width: wp(7.5), height: wp(7.5) }}
            />
          </TouchableNativeFeedback>
        ) : (
          <Clickable
            onClick={() => {
              handleImagePick();
            }}
          >
            <Image
              source={addMediaIcon}
              style={{ width: wp(7.5), height: wp(7.5) }}
            />
          </Clickable>
        )}
      </Row>
      <ButtonContainer>
        <MyButton
          disabled={isDisable}
          text="Add Post"
          bgColor="#007aff"
          onClick={() => {
            dispatch(
              addNewProduct(
                {
                  userId: userId,
                  title: title,
                  price: price,
                  description: description,
                  imageFile: file,
                  category: category,
                  phoneNo: phoneNo,
                },
                navigation
              )
            );
          }}
        />
      </ButtonContainer>
    </Col>
  );
};

export default AddNewProduct;
