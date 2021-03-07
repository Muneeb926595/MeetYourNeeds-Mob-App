import React from "react";
import { ImageBackground, Image } from "react-native";

function Avatar({ uri, size, noCircle }) {
  if (noCircle) {
    return (
      <Image
        source={{ uri }}
        style={{
          width: size - 2,
          height: size - 2,
          marginTop: 1,
          borderRadius: 70,
          alignSelf: "center",
          borderWidth: size < 30 ? 0.4 : 1,
          borderColor: "white",
        }}
      />
    );
  }

  return (
    <ImageBackground
      style={{ width: size, height: size, marginTop: 0 }}
      source={require("../assets/avatar-circle.png")}
    >
      <Image
        source={{ uri }}
        style={{
          width: size - 2,
          height: size - 2,
          marginTop: 1,
          borderRadius: 70,
          alignSelf: "center",
          borderWidth: size < 30 ? 0.4 : 1,
          borderColor: "white",
        }}
      />
    </ImageBackground>
  );
}

export default Avatar;
