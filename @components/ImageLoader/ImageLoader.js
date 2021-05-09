import React from "react";
import { View, Image } from "react-native";
import imageLoader from "../../assets/imageLoader.gif";

import { Col } from "../../@uiComponents";

function ImageLoader() {
  return (
    <Col noFlex centerAll>
      <Image
        source={imageLoader}
        style={{
          alignSelf: "center",
          width: 40,
          height: 40,
        }}
      />
    </Col>
  );
}

export default ImageLoader;
