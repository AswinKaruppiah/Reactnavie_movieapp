import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity, Image } from "react-native";
import styles from "./profile.style";
import profile from "../../../assets/image/wp3087380-spider-man-into-the-spider-verse-wallpapers.jpg";

const Profile = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={profile} resizeMode="contain" style={styles.profileImb} />
    </TouchableOpacity>
  );
};

export default Profile;
