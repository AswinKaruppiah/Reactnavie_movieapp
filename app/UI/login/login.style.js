import { StyleSheet } from "react-native";
import { FONT } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    padding: "5%",
  },

  button: {
    width: "100%",
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  buttonText: {
    fontFamily: "DMSans-Medium",
    fontSize: 20,
    color: "white",
  },
});

export default styles;
