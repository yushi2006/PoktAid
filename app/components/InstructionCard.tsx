import React from "react";
import { Text, View, StyleSheet } from "react-native";

const InstructionCard = ({ step, title, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.stepText}>{step.toUpperCase()}</Text>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.divider} />
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8fafc", // slate-50
    borderRadius: 24,
    width: "100%",
    flex: 1,
    padding: 30,
    borderWidth: 1,
    borderColor: "#e2e8f0", // slate-200
  },
  stepText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: "#3b82f6", // blue-500
    letterSpacing: 1,
    marginBottom: 8,
  },
  titleText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 30,
    color: "#1e293b", // slate-800
    lineHeight: 38,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0", // slate-200
    width: "100%",
    marginBottom: 20,
  },
  descriptionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: "#475569", // slate-600
    lineHeight: 28,
  },
});

export default InstructionCard;