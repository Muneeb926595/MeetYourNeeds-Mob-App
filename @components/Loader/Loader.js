import React from "react";
import { View, Image } from "react-native";
import loading from "../../assets/loading.gif";

function Loader() {
  return (
    <View
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        width: 56,
        height: 56,
      }}
    >
      {/* <Image
        source={loading}
        style={{
          alignSelf: "center",
          width: 100,
          height: 100,
        }}
      /> */}
    </View>
  );
}

export default Loader;
