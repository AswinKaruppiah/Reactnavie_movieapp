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
} from "react-native";
import Profile from "../profile/Profile";
import { Stack } from "expo-router";
import { FONT } from "../../../constants";
import icons from "../../../constants/icons";
import useFetch from "../../../Hook/useFetch";
import styles from "./detail.style";
import { LinearGradient } from "expo-linear-gradient";
import { Height, width } from "../Header/header.style";
import ReadMore from "@fawazahmed/react-native-read-more";
import YTvideo from "../YTvideo/YTvideo";
import { ActivityIndicator } from "react-native";
import Moreinfo from "../Moreinfo/Moreinfo";
import Row from "../row/Row";
import { BackHandler } from "react-native";

const Moviedetails = () => {
  const parmas = useSearchParams();
  const router = useRouter();

  const [refreshing, setrefreshing] = useState(false);

  // const [id, setid] = useState(parmas.id);
  // const [type, settype] = useState(parmas.type);

  const { data, isLoading, error, refetch } = useFetch(parmas.type, parmas.id);

  // console.log(data);

  const onRefresh = useCallback(() => {
    setrefreshing(true);
    refetch();
    setrefreshing(false);
  }, []);
  function handleBackButtonClick() {
    router.push("/UI/Home/Home");
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#000000", flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#000000" },
          headerShadowVisible: false,
          headerBackVisible: false,

          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/UI/Home/Home")}>
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
              Details
            </Text>
          ),
        }}
      />

      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <View style={styles.indicatorWrapper}>
            <ActivityIndicator color={"white"} size="large" />
          </View>
        ) : error ? (
          alert(error)
        ) : (
          <View>
            <ImageBackground
              style={styles.backimg}
              source={{
                uri: `https://image.tmdb.org/t/p/w1280${
                  data?.backdrop_path ?? data?.poster_path
                }`,
              }}
            >
              <LinearGradient
                style={{ height: "100%", opacity: 0.89 }}
                start={[0.5, 0.5]}
                end={[0, 0]}
                colors={["#000000", "#000000", "transparent"]}
              >
                <View
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{ margin: 10, marginRight: 0 }}>
                    <Image
                      style={styles.poster}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w1280${
                          data?.poster_path ?? data?.backdrop_path
                        }`,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      margin: 10,
                      flex: 1,
                      height: Height / 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: FONT.bold,
                        fontSize: 20,
                      }}
                    >
                      {data?.original_title ??
                        data?.title ??
                        data?.name ??
                        data?.original_name}
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
                          {data?.release_date ??
                            data?.first_air_date ??
                            "No Info"}
                          /<Text>{data?.original_language ?? "No Info"}</Text>
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
                          {data?.vote_average ?? "No Info"}
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
                      {data?.runtime ?? "no Info"}
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
                      {data?.status}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
            <View
              style={{
                margin: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: FONT.bold,
                  fontSize: 22,
                  marginBottom: 5,
                  color: "white",
                }}
              >
                Overview:
              </Text>
              <ReadMore
                seeMoreStyle={{
                  color: "black",
                  fontFamily: FONT.medium,
                  fontSize: 17,
                  color: "white",
                }}
                seeLessStyle={{
                  color: "black",
                  fontFamily: FONT.medium,
                  fontSize: 17,
                  color: "white",
                }}
                numberOfLines={3}
                style={{
                  fontFamily: FONT.regular,
                  fontSize: 15,
                  color: "white",
                }}
              >
                {data.overview}
              </ReadMore>
            </View>
          </View>
        )}

        <View
          style={{
            margin: 10,
          }}
        >
          <YTvideo id={parmas.id} typevideo={parmas.type} />
          <Moreinfo id={parmas.id} typevideo={parmas.type} />
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
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontFamily: FONT.regular,
              fontSize: 12,
              marginTop: 5,
              textAlign: "center",
            }}
          >
            @
            {data?.original_title ??
              data?.title ??
              data?.name ??
              data?.original_name}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Moviedetails;

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
