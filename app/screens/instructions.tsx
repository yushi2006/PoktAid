import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, Animated, TouchableOpacity } from "react-native";
import Bar from "../components/bar";
import InstructionCard from "../components/InstructionCard"; // Updated component
import NavigationButton from "../components/NavigationButton"; // Updated component
import LoadingScreen from "./loading"; // Our new loading screen
import type { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "../../App";

// --- Mock analysis functions remain the same ---
const analyzeImage = (photoUri) => new Promise(res => setTimeout(() => res([{ id: 1, title: "Assess the Burn", text: "The image suggests a minor first-degree burn. Check for redness and minor inflammation." }, { id: 2, title: "Cool the Burn", text: "Immerse the burn in cool (not cold) tap water or apply cool, wet compresses for about 10 minutes." }, { id: 3, title: "Apply Ointment", text: "Apply an antibiotic ointment like Neosporin or a moisturizer like aloe vera." }]), 3000));
const analyzeAudio = (transcribedText) => new Promise(res => setTimeout(() => res([{ id: 1, title: "Identify the Sound", text: "The audio suggests wheezing, a high-pitched whistling sound." }, { id: 2, title: "Sit Upright", text: "Do not lie down. Sitting upright can help open your airways." }, { id: 3, title: "Use Rescue Inhaler", text: "If you have a prescribed rescue inhaler (like albuterol), use it as directed." }]), 1500));

type Props = StackScreenProps<RootStackParamList, "Instructions">;

const Instructions = ({ route, navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [instructions, setInstructions] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const performAnalysis = async () => {
      try {
        let result = "recognizedText" in route.params
          ? await analyzeAudio(route.params.recognizedText)
          : await analyzeImage(route.params.photoUri);
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

  if (isLoading) return <LoadingScreen message={"Generating Instructions..."}/>;
  
  if (!instructions || instructions.length === 0) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Analysis Failed</Text>
          <Text style={styles.errorText}>We couldn't generate instructions. Please try again or call emergency services if needed.</Text>
          <TouchableOpacity style={styles.errorButton} onPress={() => navigation.goBack()}>
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isLastStep = idx === instructions.length - 1;
  const progress = ((idx + 1) / instructions.length) * 100;

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <Bar />
      <View style={styles.main}>
        {/* --- NEW Progress Bar --- */}
        <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Step {idx + 1} of {instructions.length}</Text>
            <View style={styles.progressBarBackground}>
                <Animated.View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
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
            <NavigationButton isBackButton={true} onPress={() => setIdx(idx - 1)} />
          ) : (
            <View style={styles.buttonSpacer} /> // Keeps "Next" button on the right
          )}
          <NavigationButton
            isFinishButton={isLastStep}
            onPress={() => isLastStep ? navigation.navigate("Home") : setIdx(idx + 1)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// --- NEW "RICED" STYLES ---
const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#FFFFFF' },
    main: { flex: 1, justifyContent: 'space-between', paddingBottom: 40, paddingHorizontal: 20 },
    progressContainer: { 
        paddingVertical: 20,
    },
    progressText: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#475569',
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#3b82f6',
    },
    cardContainer: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingVertical: 20,
    },
    navigationContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    buttonSpacer: { minWidth: 140 },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
    errorTitle: { fontFamily: 'Poppins_700Bold', fontSize: 22, color: '#1e293b', textAlign: 'center' },
    errorText: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#64748b', textAlign: 'center', marginTop: 10, lineHeight: 24 },
    errorButton: { marginTop: 30, backgroundColor: '#3b82f6', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 12 },
    errorButtonText: { color: 'white', fontFamily: 'Poppins_600SemiBold', fontSize: 16 },
});

export default Instructions;