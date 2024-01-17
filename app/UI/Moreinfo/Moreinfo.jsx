import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LogBox,
} from "react-native";
import { React, useState, useEffect } from "react";
import { FONT } from "../../../constants";
import Review from "./review/Review";
import Language from "./language/Language";
import Actor from "./credits/Actor";

const Moreinfo = ({ id, typevideo }) => {
  const options = ["Reviews", "Language", "Casting"];
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const [active, setactive] = useState(options[0]);
  const displayContent = ({ id, typevideo }) => {
    switch (active) {
      case "Reviews":
        return <Review id={id} typevideo={typevideo} />;
      case "Language":
        return <Language id={id} typevideo={typevideo} />;

      case "Casting":
        return <Actor id={id} typevideo={typevideo} />;

      default:
        break;
    }
  };

  return (
    <View style={styles.tabsContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={options}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.btn(active, item)}
            onPress={() => {
              setactive(item);
            }}
          >
            <Text style={styles.btntext(active, item)}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={{ padding: 10 }}>{displayContent({ id, typevideo })}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    width: "100%",
    marginTop: 16,
  },
  btn: (activeJobType, item) => ({
    paddingVertical: 10 / 2,
    paddingHorizontal: 10,
    borderColor: activeJobType === item ? "white" : "#A8A196",
    borderWidth: 2,
    borderRadius: 20,
    marginRight: 15,
  }),
  btntext: (activeJobType, item) => ({
    fontSize: 15,
    fontFamily: FONT.regular,
    color: activeJobType === item ? "white" : "#A8A196",
  }),
});

export default Moreinfo;
