import React from "react";
import { View, Image } from "react-native";
import loading from "../../assets/loading.gif";

import { Col } from "../../@uiComponents";

function Loader() {
  return (
    <Col noFlex centerAll>
      <Image
        source={loading}
        style={{
          alignSelf: "center",
          width: 40,
          height: 40,
        }}
      />
    </Col>
  );
}

export default Loader;
