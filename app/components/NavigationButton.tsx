import React, { useRef } from "react";
import { Text, StyleSheet, Pressable, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NavigationButton = ({ isBackButton, isFinishButton, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const buttonStyle = isBackButton ? styles.back : isFinishButton ? styles.finish : styles.next;
  const textStyle = isBackButton ? styles.backText : styles.nextText;
  const iconColor = isBackButton ? "#475569" : "white";

  const pressIn = () => Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }).start();

  return (
    <Pressable onPressIn={pressIn} onPressOut={pressOut} onPress={onPress}>
        <Animated.View style={[styles.button, buttonStyle, { transform: [{ scale: scaleAnim }] }]}>
            {isBackButton && <Ionicons name="arrow-back" size={20} color={iconColor} />}
            <Text style={textStyle}>
                {isBackButton ? "Back" : isFinishButton ? "Finish" : "Next"}
            </Text>
            {!isBackButton && <Ionicons name={isFinishButton ? "checkmark-circle" : "arrow-forward"} size={20} color={iconColor} />}
        </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 130,
  },
  back: {
    backgroundColor: "#e2e8f0", // slate-200
  },
  next: {
    backgroundColor: "#3b82f6", // blue-500
  },
  finish: {
    backgroundColor: "#16a34a", // green-600
  },
  backText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: "#475569", // slate-600
    marginHorizontal: 8,
  },
  nextText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: "white",
    marginHorizontal: 8,
  },
});

export default NavigationButton;