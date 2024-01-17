import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FONT } from "../../../constants";
import styles from "./row.style";
import useFetch from "../../../Hook/useFetch";
import icons from "../../../constants/icons";
import { useRouter } from "expo-router";
import { Height } from "../Header/header.style";

const Row = ({ titlename, type, endpoint, page }) => {
  const { data, isLoading, error, refetch } = useFetch(type, endpoint, page);

  const router = useRouter();
  const [hide, sethide] = useState(true);

  const findtype = (item) => {
    if (item?.media_type) {
      router.replace({
        pathname: "../moviedetails/detail",
        params: { id: item.id, type: item.media_type },
      });
    } else if (item?.original_title) {
      router.replace({
        pathname: "../moviedetails/detail",
        params: { id: item?.id, type: "movie" },
      });
    } else if (item?.original_name) {
      router.replace({
        pathname: "../moviedetails/detail",
        params: { id: item?.id, type: "tv" },
      });
    } else {
      alert("try again later");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: FONT.bold, fontSize: 27, color: "white" }}>
        {titlename}
      </Text>
      {isLoading ? (
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator color={"white"} size="large" />
        </View>
      ) : error ? (
        alert(error)
      ) : (
        <View>
          {hide && (
            <View
              style={{
                height: Height / 4,
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
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data.results}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              sethide(false);
              return (
                <TouchableOpacity onPress={() => findtype(item)}>
                  <View key={item?.id} style={styles.imgcontainer}>
                    <Image
                      style={styles.rowimg}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w1280${
                          item?.poster_path ?? item?.backdrop_path
                        }`,
                      }}
                    />
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingTop: 5,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{ height: 15, width: 15 }}
                          source={icons.star}
                        />
                        <Text
                          style={{
                            fontFamily: FONT.regular,
                            marginLeft: 1,
                            color: "white",
                            fontSize: 10,
                          }}
                        >
                          {item?.vote_average ?? "No Info"}/
                          <Text
                            style={{
                              fontFamily: FONT.regular,
                              color: "#706C61",
                              fontWeight: "500",
                            }}
                          >
                            {item?.original_language ?? "No Info"}
                          </Text>
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: FONT.regular,
                            fontSize: 7,
                            fontWeight: "500",
                            paddingTop: 2,
                            color: "#F1F1F1",
                          }}
                        >
                          {item?.release_date ??
                            item?.first_air_date ??
                            "No Info"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item?.id}
          />
        </View>
      )}
    </View>
  );
};

export default Row;
{
  /* router.push(`../moviedetails/${item?.id}`) */
}
