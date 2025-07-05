// components/Bar.js
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Bar = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const showBackButton = route.name !== "Home";

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigator.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#3498db" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.middle}>
        <Text style={styles.title}>PoktAid</Text>
      </View>
      <View style={styles.right} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Platform.OS === "android" ? 40 : 50, // Safe area padding
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
  },
  middle: {
    flex: 2,
    alignItems: "center",
  },
  right: {
    flex: 1, // This is a spacer to keep the title centered
  },
  title: {
    color: "#2c3e50",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    padding: 5, // Larger touch target
  },
});

export default Bar;
