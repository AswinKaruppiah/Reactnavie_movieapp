import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { React, useState } from "react";
import useFetch from "../../../../Hook/useFetch";
import { width, Height } from "../../Header/header.style";
import { FONT } from "../../../../constants";
import ReadMore from "@fawazahmed/react-native-read-more";

const Language = ({ id, typevideo }) => {
  const { data, isLoading, error, refetch } = useFetch(
    typevideo,
    `${id}/translations`
  );
  const [hide, sethide] = useState(true);

  const check = (data) => {
    if (data) {
      return data;
    } else {
      return "no Overview";
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
            No Data
          </Text>
        </View>
      )}

      <View
        style={{
          height: Height / 2.2,
        }}
      >
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            scrollEventThrottle={16}
            data={data.translations}
            renderItem={({ item }) => (
              sethide(false),
              (
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: FONT.medium,
                      fontSize: 15,
                    }}
                  >
                    {item?.english_name +
                      `(${
                        item?.name ?? item?.iso_639_1 ?? item?.iso_3166_1
                      })` ??
                      item?.iso_639_1 ??
                      item?.iso_3166_1 ??
                      "No Info"}
                  </Text>
                  <ReadMore
                    seeMoreStyle={{
                      color: "white",
                      fontFamily: FONT.medium,
                      fontSize: 13,
                    }}
                    seeLessStyle={{
                      color: "white",
                      fontFamily: FONT.medium,
                      fontSize: 13,
                    }}
                    numberOfLines={2}
                    style={{
                      fontFamily: FONT.regular,
                      fontSize: 10,
                      color: "#A8A196",
                    }}
                  >
                    {check(item?.data.overview)}
                  </ReadMore>
                </View>
              )
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Language;
// {
//   item?.data.overview ?? "No overview";
// }
