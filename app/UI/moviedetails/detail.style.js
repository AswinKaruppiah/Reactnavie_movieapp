import { StyleSheet } from "react-native";
import { Height, width } from "../Header/header.style";

const styles = StyleSheet.create({
  backimg: {
    height: Height / 2.5,
    // width: width,
  },
  poster: {
    height: Height / 4,
    width: width / 3,
    borderRadius: 3,
  },
  indicatorWrapper: {
    height: Height / 1.8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
