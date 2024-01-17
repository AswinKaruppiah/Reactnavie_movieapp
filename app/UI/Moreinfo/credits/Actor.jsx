import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { React, useState } from "react";
import useFetch from "../../../../Hook/useFetch";
import { FONT } from "../../../../constants";
import ReadMore from "@fawazahmed/react-native-read-more";
import { width, Height } from "../../Header/header.style";

const Actor = ({ id, typevideo }) => {
  const { data, isLoading, error, refetch } = useFetch(
    typevideo,
    `${id}/credits`
  );

  const [hide, sethide] = useState(true);
  const check = (data) => {
    if (data) {
      return data;
    } else {
      return "no Content";
    }
  };
  const checkImageURL = (url) => {
    if (!url) return false;
    else {
      const pattern = new RegExp(
        "^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$",
        "i"
      );
      return pattern.test(url);
    }
  };

  return isLoading ? (
    <View
      style={{
        height: Height / 2.2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color={"white"} size={"large"} />
    </View>
  ) : error ? (
    alert(error)
  ) : (
    <View style={{ flex: 1 }}>
      {hide && (
        <View
          style={{
            height: Height / 2.2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: FONT.medium,
              fontSize: 30,
            }}
          >
            No Info
          </Text>
        </View>
      )}
      <View
        style={{
          height: Height / 2.2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            scrollEventThrottle={16}
            data={data.cast}
            renderItem={({ item, index }) => (
              sethide(false),
              (
                <View
                  key={index}
                  style={{
                    marginTop: 5,
                    backgroundColor: "#333333",
                    width: width - 40,
                    borderRadius: 7,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      height: 100,
                      padding: 10,
                    }}
                  >
                    <Image
                      style={{
                        height: 80,
                        width: 80,
                        resizeMode: "contain",
                        borderRadius: 10,
                      }}
                      source={{
                        uri: checkImageURL(
                          `https://image.tmdb.org/t/p/w1280${item?.profile_path}`
                        )
                          ? `https://image.tmdb.org/t/p/w1280${item?.profile_path}`
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1, width: width }}>
                      <Text
                        style={{
                          color: "white",
                          fontFamily: FONT.medium,
                          fontSize: 20,
                        }}
                      >
                        {item?.original_name ?? item?.name}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontFamily: FONT.medium,
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        In Film : {item?.character ?? "No Info"}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontFamily: FONT.regular,
                          fontSize: 10,
                          marginTop: 5,
                        }}
                      >
                        Department : {item?.known_for_department ?? "No Info"}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Actor;

{
  /* <FlatList
  data={data.results}
  renderItem={({ item }) => (
    sethide(false),
    (
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: FONT.medium, fontSize: 15 }}>
          {item?.author ?? item?.author_details.username ?? "No name"}
        </Text>
        <Text
          style={{
            fontFamily: FONT.regular,
            fontSize: 10,
            marginBottom: 10,
          }}
        >
          {item?.created_at ?? item?.updated_at ?? "No date"}
        </Text>

        <ReadMore
          seeMoreStyle={{
            color: "black",
            fontFamily: FONT.medium,
            fontSize: 13,
          }}
          seeLessStyle={{
            color: "black",
            fontFamily: FONT.medium,
            fontSize: 13,
          }}
          numberOfLines={2}
          style={{ fontFamily: FONT.regular, fontSize: 10 }}
        >
          {check(item?.content)}
        </ReadMore>
      </View>
    )
  )}
/>; */
}
