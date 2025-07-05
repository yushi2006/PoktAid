import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Easing,
} from "react-native";

const FIRST_AID_TIPS = [
  "For minor burns, cool the area with running water for 10-20 minutes.",
  "Learn the signs of a stroke: F.A.S.T. (Face, Arms, Speech, Time).",
  "In case of a seizure, keep the person safe and do not restrain them.",
  "Apply direct pressure to a bleeding wound with a clean cloth.",
  "The universal emergency number in many countries is 112 or 911.",
  "For a nosebleed, pinch the soft part of the nose and lean forward.",
  "Check for responsiveness and breathing before administering CPR.",
];

const LoadingScreen = () => {
  const [tipIndex, setTipIndex] = useState(0);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    const tipInterval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTipIndex((prevIndex) => (prevIndex + 1) % FIRST_AID_TIPS.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);

    return () => {
      pulseAnimation.stop();
      clearInterval(tipInterval);
    };
  }, [pulseAnim, fadeAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* Animated Medical Cross Icon */}
      <Animated.View
        style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}
      >
        <Text style={styles.iconText}>+</Text>
      </Animated.View>

      <Text style={styles.title}>First Aid Assistant</Text>
      <Text style={styles.subtitle}>Preparing essential info...</Text>

      {/* Animated Tip Text */}
      <Animated.Text style={[styles.tipText, { opacity: fadeAnim }]}>
        {`Tip: ${FIRST_AID_TIPS[tipIndex]}`}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#D9534F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  iconText: {
    fontSize: 60,
    color: "#FFFFFF",
    fontWeight: "bold",
    lineHeight: 65,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 40,
  },
  tipText: {
    fontSize: 16,
    color: "#555555",
    textAlign: "center",
    fontStyle: "italic",
    paddingHorizontal: 20,
  },
});

export default LoadingScreen;
