import { StyleSheet } from "react-native";
import { width, Height } from "../Header/header.style";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  indicatorWrapper: {
    height: Height / 4,
    alignItems: "center",
    justifyContent: "center",
  },
  rowimg: {
    height: Height / 4,
    width: width / 3,
    borderRadius: 4,
    resizeMode: "cover",
  },
  imgcontainer: {
    paddingTop: 8,
    padding: 10,
    paddingLeft: 0,
  },
});

export default styles;
