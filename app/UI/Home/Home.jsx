import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "../Header/Header";
import { Stack } from "expo-router";
import Menu from "../menubar/Menu";
import Profile from "../profile/Profile";
import Movielist from "../movielist/Movielist";
import { BackHandler } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import Form from "../Form/Form";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen
        options={{
          headerBackVisible: false,

          headerStyle: {
            backgroundColor: "#000000",
          },
          headerShadowVisible: false,

          headerTitle: () => <Form />,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Header tpye="trending/movie" endpoint="day" page="1" />
        <Movielist />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
