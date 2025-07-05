import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Bar from "../components/bar";
import InstructionCard from "../components/card";
import NavigationButton from "../components/navigationButton";
import LoadingScreen from "./loading";
import { useNavigation } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "../../App";

const analyzeImage = (photoUri) => {
  console.log("Analyzing IMAGE at:", photoUri);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Assess the Burn",
          text: "The image suggests a minor first-degree burn. Check for redness and minor inflammation.",
        },
        {
          id: 2,
          title: "Cool the Burn",
          text: "Immediately immerse the burn in cool (not cold) tap water or apply cool, wet compresses for about 10 minutes.",
        },
        {
          id: 3,
          title: "Apply Ointment",
          text: "Apply an antibiotic ointment like Neosporin or a moisturizer like aloe vera.",
        },
        {
          id: 4,
          title: "Cover Loosely",
          text: "Cover the burn with a sterile gauze bandage. Do not use fluffy cotton, which may irritate the skin.",
        },
      ]);
    }, 3000);
  });
};

const analyzeAudio = (audioUri) => {
  console.log("Analyzing AUDIO at:", audioUri);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Identify the Sound",
          text: "The audio suggests wheezing, a high-pitched whistling sound made while you breathe.",
        },
        {
          id: 2,
          title: "Sit Upright",
          text: "Do not lie down. Sitting upright can help open your airways.",
        },
        {
          id: 3,
          title: "Use a Rescue Inhaler",
          text: "If you have a prescribed rescue inhaler (like albuterol), use it as directed.",
        },
        {
          id: 4,
          title: "Seek Medical Help",
          text: "If breathing becomes increasingly difficult or you don't have an inhaler, call emergency services immediately.",
        },
      ]);
    }, 4000);
  });
};

type Props = StackScreenProps<RootStackParamList, "Instructions">;

const Instructions = ({ route, navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [instructions, setInstructions] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const performAnalysis = async () => {
      try {
        let result;
        if ("photoUri" in route.params) {
          result = await analyzeImage(route.params.photoUri);
        } else if ("audioUri" in route.params) {
          result = await analyzeAudio(route.params.audioUri);
        }
        setInstructions(result || []);
      } catch (error) {
        console.error("Analysis failed:", error);
        setInstructions([]);
      } finally {
        setIsLoading(false);
      }
    };

    performAnalysis();
  }, [route.params]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!instructions || instructions.length === 0) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Could not generate instructions.</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  const isLastStep = idx === instructions.length - 1;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <Bar />
      <View style={styles.main}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Step {idx + 1} of {instructions.length}
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <InstructionCard
            step={`Step ${instructions[idx].id}`}
            title={instructions[idx].title}
            description={instructions[idx].text}
          />
        </View>

        <View style={styles.navigationContainer}>
          {idx > 0 ? (
            <NavigationButton
              isBackButton={true}
              onPress={() => setIdx(idx - 1)}
            />
          ) : (
            <View style={styles.buttonSpacer} /> // Keeps "Next" button on the right
          )}

          <NavigationButton
            isBackButton={false}
            isFinishButton={isLastStep}
            onPress={() => {
              if (isLastStep) {
                navigation.navigate("Home"); // Or a "Completed" screen
              } else {
                setIdx(idx + 1);
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// --- (ADDED) Error container style ---
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  progressContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  progressText: {
    fontSize: 16,
    color: "#7f8c8d",
    fontWeight: "600",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonSpacer: {
    minWidth: 140,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 20,
  },
});

export default Instructions;
