import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
export const { width } = Dimensions.get("window");

export const Height = Dimensions.get("window").height;

export const itemSize = width * 0.72;
export const space = 5;

const styles = StyleSheet.create({
  container: {
    height: Height / 2.2,
  },

  movieinner: {
    padding: space * 2,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 4,
    marginRight: 0,
    transform: [{ scaleX: 0.97 }],
    margin: 0,
  },
  indicatorWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {},

  moviecontent: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
  },
  posterimg: {
    width: width,
    height: Height / 2.2,
    borderRadius: 10,
    overflow: "hidden",
    resizeMode: "cover",
  },
});

export default styles;
