import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import productPlaceholder from "../../assets/productPlaceholder.jpg";
import ImageLoader from "../../@components/ImageLoader/ImageLoader";
import { Col } from "../../@uiComponents";

const localBaseUrl = "http://localhost:3000/api/";
const productionBaseUrl = "https://meet-your-needs-api.herokuapp.com/api/";

const ProductImage = (imageUrl) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageExist, setImageExist] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(productionBaseUrl + imageUrl, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setIsLoading(false);
          setImageExist(true);
          return true;
        } else {
          setIsLoading(false);
          setImageExist(false);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        setIsLoading(false);
      });
  }, [imageUrl]);

  return (
    <>
      {imageUrl ? (
        isLoading ? (
          <Col centerAll>
            <ImageLoader />
          </Col>
        ) : imageExist ? (
          <Image
            style={{
              borderRadius: 16,
              width: wp(84),
              height: wp(50),
              marginTop: wp(2.5),
            }}
            source={{ uri: productionBaseUrl + imageUrl }}
          />
        ) : (
          <Image
            style={{
              borderRadius: 16,
              width: wp(84),
              height: wp(50),
              marginTop: wp(2.5),
            }}
            source={productPlaceholder}
          />
        )
      ) : (
        <Image
          style={{
            borderRadius: 16,
            width: wp(84),
            height: wp(50),
            marginTop: wp(2.5),
          }}
          source={productPlaceholder}
        />
      )}
    </>
  );
};

export default ProductImage;
