import { View, Text } from "react-native";
import React from "react";
import { FONT } from "../../../constants/theme";
import Row from "../row/Row";

const Movielist = () => {
  return (
    <View style={{ padding: 8, paddingTop: 20 }}>
      <Row
        titlename="Now Playing Movies"
        type="movie"
        endpoint="now_playing"
        page="1"
      />
      {/* trend */}
      <Row titlename="Tv Show" type="trending/tv" endpoint="day" page="1" />

      <Row
        titlename="Top Rated Movies"
        type="movie"
        endpoint="top_rated"
        page="3"
      />
      {/* trend */}
      <Row
        titlename="Favourite's"
        type="trending/all"
        endpoint="day"
        page="4"
      />
      <Row
        titlename="Popular Movies"
        type="movie"
        endpoint="popular"
        page="2"
      />
      <Row titlename="Entertainment" type="tv" endpoint="top_rated" page="1" />
      <Row titlename="Fun Shows" type="tv" endpoint="top_rated" page="2" />
    </View>
  );
};

export default Movielist;
