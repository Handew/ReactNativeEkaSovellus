import React from "react";
import { Image } from "react-native";
import styles from "./styles/styles";

const DisplayAnImage = () => {
  return (
    <>
      <Image
        style={styles.tinyLogo}
        source={require("./assets/react-logo2.png")}
      />
    </>
  )
}

export default DisplayAnImage