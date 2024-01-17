import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity, Image } from "react-native";
import icons from "../../../constants/icons";
import styles from "./menu.style";

const Menu = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={icons.menuicon}
        resizeMode="contain"
        style={styles.btnImg}
      />
    </TouchableOpacity>
  );
};

export default Menu;
