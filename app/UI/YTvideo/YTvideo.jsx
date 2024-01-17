import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import { React, useState, useEffect } from "react";
import useFetch from "../../../Hook/useFetch";
import { FONT } from "../../../constants";
import { Video, ResizeMode } from "expo-av";
import { Height, width } from "../Header/header.style";
import YoutubePlayer from "react-native-youtube-iframe";

const YTvideo = ({ id, typevideo }) => {
  const { data, isLoading, error, refetch } = useFetch(
    typevideo,
    `${id}/videos`
  );

  const [hide, sethide] = useState(true);

  return (
    <View>
      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: 22,
          marginBottom: 5,
          color: "white",
        }}
      >
        Video's
      </Text>

      {isLoading ? (
        <View
          style={{
            height: width / 1.8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color="white" size="large" />
        </View>
      ) : error ? (
        alert(error)
      ) : (
        hide && (
          <View
            style={{
              height: width / 1.8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#706C61",
                fontSize: 30,
                // textAlign: "center",
              }}
            >
              No Video's.....
            </Text>
          </View>
        )
      )}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        data={data.results}
        renderItem={({ item, index }) => {
          sethide(false);
          return (
            <View
              style={{
                height: width / 1.8,
                width: width,
                paddingRight: 20,
              }}
            >
              <View>
                <YoutubePlayer
                  webViewStyle={{ opacity: 0.99 }}
                  height={width / 1.8}
                  play={false}
                  videoId={item.key}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default YTvideo;
