import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./login.style";
import introimg from "../../../assets/image/wp7046960-mix-of-movies-wallpapers.jpg";
import icons from "../../../constants/icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();

  return (
    <ImageBackground
      style={{ height: "100%", width: "100%" }}
      source={introimg}
    >
      <LinearGradient
        style={{ height: "100%", opacity: 0.9 }}
        start={[0.5, 0.5]}
        end={[0, 0]}
        colors={["#000000", "transparent"]}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.bottom}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/UI/Home/Home")}
            >
              <Text style={styles.buttonText}>
                Watch
                {/* <Image source={icons.rigthicon} resizeMode="contain" /> */}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Login;
