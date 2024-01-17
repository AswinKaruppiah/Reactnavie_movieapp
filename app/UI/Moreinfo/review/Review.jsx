import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { React, useState } from "react";
import useFetch from "../../../../Hook/useFetch";
import { FONT } from "../../../../constants";
import ReadMore from "@fawazahmed/react-native-read-more";
import { width, Height } from "../../Header/header.style";

const Review = ({ id, typevideo }) => {
  const { data, isLoading, error, refetch } = useFetch(
    typevideo,
    `${id}/reviews`
  );

  const [hide, sethide] = useState(true);

  const check = (data) => {
    if (data) {
      return data;
    } else {
      return "no Content";
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
    <View
      style={{
        height: Height / 2.2,
      }}
    >
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
              fontFamily: FONT.medium,
              fontSize: 30,
              color: "white",
            }}
          >
            No comment's !
          </Text>
        </View>
      )}
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          scrollEventThrottle={16}
          data={data.results}
          renderItem={({ item, index }) => (
            sethide(false),
            (
              <View key={index} style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontFamily: FONT.medium,
                    fontSize: 15,
                    color: "white",
                  }}
                >
                  {item?.author ?? item?.author_details.username ?? "No name"}
                </Text>
                <Text
                  style={{
                    fontFamily: FONT.regular,
                    fontSize: 10,
                    marginBottom: 10,
                    color: "#A8A196",
                  }}
                >
                  {item?.created_at ?? item?.updated_at ?? "No date"}
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
                  {check(item?.content)}
                </ReadMore>
              </View>
            )
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Review;
