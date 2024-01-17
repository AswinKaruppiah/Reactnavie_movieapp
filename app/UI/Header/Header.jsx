import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import styles, { itemSize } from "./header.style";
import { FONT } from "../../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import useFetch from "../../../Hook/useFetch";
import { useRouter } from "expo-router";

const Header = ({ tpye, endpoint, page }) => {
  const { data, isLoading, error, refetch } = useFetch(tpye, endpoint, page);

  // console.log(data.results);
  const router = useRouter();

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
      {isLoading ? (
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator color={"white"} size="large" />
        </View>
      ) : error ? (
        alert(error)
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data.results}
          scrollEventThrottle={16}
          pagingEnabled
          renderItem={({ item, index }) => {
            return (
              <View style={styles.movieinner}>
                <ImageBackground
                  key={item?.id}
                  style={styles.posterimg}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w1280${
                      item?.poster_path ?? item?.backdrop_path
                    }`,
                  }}
                >
                  <LinearGradient
                    style={{ height: "100%", width: "100%" }}
                    start={[0, 0]}
                    end={[1, 1]}
                    colors={["#000000", "transparent"]}
                  >
                    <View style={styles.moviecontent} key={item?.id}>
                      <Text
                        style={{
                          fontFamily: FONT.bold,
                          color: "white",
                          fontSize: 30,
                        }}
                      >
                        {item?.original_title ?? item?.title}
                      </Text>
                      {item.overview && (
                        <Text
                          numberOfLines={2}
                          style={{
                            paddingTop: 10,
                            fontFamily: FONT.regular,
                            color: "white",
                            fontSize: 15,
                          }}
                        >
                          {item.overview}
                        </Text>
                      )}
                      <TouchableOpacity
                        onPress={() => findtype(item)}
                        style={{
                          justifyContent: "center",
                          width: 75,
                          paddingTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            backgroundColor: "white",
                            fontFamily: FONT.medium,
                            color: "black",
                            fontSize: 15,
                            textAlign: "center",
                            borderRadius: 15,
                            padding: 10,
                            paddingVertical: 8,
                          }}
                        >
                          View
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </View>
            );
          }}
          keyExtractor={(item) => item?.id}
        />
      )}
    </View>
  );
};

export default Header;
