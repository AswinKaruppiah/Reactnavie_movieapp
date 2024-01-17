import { View, Text, TextInput } from "react-native";
import { React, useState } from "react";
import { width } from "../Header/header.style";
import { FONT } from "../../../constants";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import icons from "../../../constants/icons";
import { useRouter } from "expo-router";

export default function Form() {
  const [search, setsearch] = useState();
  const router = useRouter();

  return (
    <View
      style={{
        borderColor: "white",
        display: "flex",
        flexDirection: "row",

        width: width,
      }}
    >
      <TextInput
        placeholder="Search"
        placeholderTextColor="white"
        value={search}
        onChangeText={(text) => setsearch(text)}
        style={{
          paddingLeft: 10,
          color: "white",
          height: 40,
          fontSize: 15,
          fontFamily: FONT.medium,
          borderWidth: 2,
          width: "78%",
          borderColor: "white",
          borderRadius: 10,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (search) {
            router.push({
              pathname: "../search/search",
              params: { name: search },
            });
            setsearch("");
          }
        }}
        style={{ justifyContent: "center", alignContent: "center" }}
      >
        <Image
          source={icons.search}
          resizeMode="cover"
          style={{
            justifyContent: "center",
            alignContent: "center",
            width: 40,
            height: 40,
            borderRadius: 5,
            backgroundColor: "white",
            marginLeft: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
