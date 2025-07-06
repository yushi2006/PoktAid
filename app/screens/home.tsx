import React from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ActionCard from "../components/ActionCard"; // We will redesign this
import EmergencyButton from "../components/EmergencyButton"; // A new component
import Bar from '../components/bar';

const Home = () => {
  const navigator = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Bar />
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Your First-Aid Assistant</Text>
          <Text style={styles.subHeader}>How can we help you today?</Text>
        </View>

        <View style={styles.actionsContainer}>
          <ActionCard
            onPress={() => navigator.navigate("CameraScreen")}
            iconName="camera-outline"
            title="Scan Injury"
            description="Use your camera to identify the issue"
          />
          <ActionCard
            onPress={() => navigator.navigate("MicrophoneScreen")}
            iconName="mic-outline"
            title="Describe Injury"
            description="Explain the situation with your voice"
          />
        </View>
        
        {/* The new, dedicated emergency button at the bottom */}
        <EmergencyButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF", // A cleaner white background
  },
  content: {
    flex: 1,
    justifyContent: "space-between", // Pushes header up and emergency button down
    padding: 20,
    paddingBottom: 40, // More space at the bottom
  },
  headerContainer: {
    alignItems: "flex-start", // Left-align for a more formal feel
    marginTop: 20,
  },
  header: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    color: "#1e293b", // A softer black (slate-800)
    lineHeight: 40,
  },
  subHeader: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "#64748b", // A lighter gray (slate-500)
    marginTop: 8,
  },
  actionsContainer: {
    marginTop: -80, // Pulls the cards up into the middle space
  },
});

export default Home;