import { React, useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  Image,
  RefreshControl,
  FlatList,
} from "react-native";
import axios from "axios";
import { Stack } from "expo-router";
import { FONT } from "../../../constants";
import icons from "../../../constants/icons";
import useFetch from "../../../Hook/useFetch";

import { Height, width } from "../Header/header.style";
import ReadMore from "@fawazahmed/react-native-read-more";

import { ActivityIndicator } from "react-native";

const Search = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [refreshing, setrefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hide, sethide] = useState(true);

  const handleSearch = async () => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/multi?api_key=b095c2e4d7761a7c5e47f91b29058fef&query=${params.name}`,

        // page: page.toString(),
      };

      const response = await axios.request(options);
      setSearchResult(response.data);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  // const handlePagination = (direction) => {
  //   if (direction === "left" && page > 1) {
  //     setPage(page - 1);
  //     handleSearch();
  //   } else if (direction === "right") {
  //     setPage(page + 1);
  //     handleSearch();
  //   }
  // };

  useEffect(() => {
    handleSearch();
  }, []);

  const onRefresh = useCallback(() => {
    setrefreshing(true);
    handleSearch();
    setrefreshing(false);
  }, []);

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
    <SafeAreaView style={{ height: Height, backgroundColor: "#000000" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#000000" },
          headerShadowVisible: false,
          headerBackVisible: false,

          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={{
                  height: 23,
                  width: 23,
                  resizeMode: "cover",
                  marginRight: 10,
                }}
                source={icons.leftarrow}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text
              style={{ fontFamily: FONT.bold, fontSize: 20, color: "white" }}
            >
              {params.name}
            </Text>
          ),
        }}
      />

      {searchLoader ? (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "black",
            height: "100%",
          }}
        >
          <ActivityIndicator color={"white"} size="large" />
        </View>
      ) : searchError ? (
        alert(searchError)
      ) : (
        <View>
          {hide && (
            <View
              style={{
                height: Height,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: FONT.medium,
                  fontSize: 30,
                }}
              >
                No Info
              </Text>
            </View>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <FlatList
              scrollEventThrottle={16}
              data={searchResult.results}
              renderItem={({ item, index }) => (
                sethide(false),
                (
                  <TouchableOpacity onPress={() => findtype(item)}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",

                        height: Height / 3.5,
                        padding: 10,
                      }}
                    >
                      <Image
                        style={{
                          height: Height / 4,
                          width: width / 3,
                          borderRadius: 4,
                          resizeMode: "cover",
                        }}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w1280${
                            item?.poster_path ?? item?.backdrop_path
                          }`,
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
                          {item?.original_title ??
                            item?.title ??
                            item?.name ??
                            item?.original_name}
                        </Text>

                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",

                            paddingTop: 8,
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontFamily: FONT.regular,
                                fontSize: 13,
                                fontWeight: "500",
                                color: "#706C61",
                              }}
                            >
                              {item?.release_date ??
                                item?.first_air_date ??
                                "No Info"}
                              /
                              <Text>
                                {item?.original_language ?? "No Info"}
                              </Text>
                            </Text>
                          </View>
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
                                marginRight: 2,
                                color: "#706C61",
                                fontWeight: "500",
                              }}
                            >
                              {item?.vote_average ?? "No Info"}
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            fontFamily: FONT.regular,
                            color: "#706C61",
                            fontWeight: "500",
                            marginTop: 4,
                          }}
                        >
                          {item?.runtime ?? "no Info"}
                          /Mins
                        </Text>
                        <Text
                          style={{
                            fontFamily: FONT.regular,
                            color: "#706C61",
                            fontWeight: "500",
                            marginTop: 4,
                          }}
                        >
                          {item?.status}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              )}
            />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;

{
  /*
          <Row
            titlename="Similar"
            type={parmas.type}
            endpoint={`${parmas.id}/similar`}
            page="1"
          />
          <Row
            titlename="Recommendations"
            type={parmas.type}
            endpoint={`${parmas.id}/recommendations`}
            page="1"
          /> */
}
