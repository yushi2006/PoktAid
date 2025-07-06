import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Cheetah } from '@picovoice/cheetah-react-native';
import { VoiceProcessor } from '@picovoice/react-native-voice-processor';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Bar from '../components/bar';

const PICOVOICE_ACCESS_KEY = "YOUR_PICOVOICE_ACCESS_KEY_HERE"; 

const formatTime = (seconds) => { /* ... unchanged ... */ const m = Math.floor(seconds / 60); const s = Math.floor(seconds % 60); return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`; };

const MicrophoneScreen = () => {
  const navigation = useNavigation();
  const [isListening, setIsListening] = useState(false);
  const [isCheetahReady, setIsCheetahReady] = useState(false);
  const [cheetahError, setCheetahError] = useState('');
  const [partialResults, setPartialResults] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [duration, setDuration] = useState(0);

  const cheetahRef = useRef(null);
  const voiceProcessorRef = useRef(VoiceProcessor.instance); // This is correct usage
  const timerInterval = useRef(null);
  
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // This function will now have a clearer error path
    const initCheetah = async () => {
      // Safeguard against the native module being null
      if (!VoiceProcessor.instance || !Cheetah) {
        setCheetahError("Native modules are not linked. Please rebuild the app.");
        return;
      }

      try {
        const cheetah = await Cheetah.create(
          PICOVOICE_ACCESS_KEY,
          { path: 'models/cheetah_params.pv' },
          { enableAutomaticPunctuation: true }
        );
        cheetahRef.current = cheetah;
        
        voiceProcessorRef.current.addFrameListener(cheetah.process);
        voiceProcessorRef.current.addErrorListener((error) => setCheetahError(error.toString()));

        setIsCheetahReady(true);
      } catch (e) {
        console.error("Failed to initialize Cheetah:", e);
        setCheetahError(`Initialization failed: ${e.message}`);
      }
    };
    initCheetah();

    return () => {
      // Robust cleanup
      if (voiceProcessorRef.current) {
        voiceProcessorRef.current.removeErrorListeners();
        voiceProcessorRef.current.removeFrameListeners();
      }
      cheetahRef.current?.delete();
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);
  
  // This useEffect and the one for navigation remain the same...
  useEffect(() => {
    if (cheetahRef.current) {
        const processSuccessSubscription = cheetahRef.current.onProcess(result => {
            if (result.transcript) setPartialResults(prev => prev + result.transcript);
            if (result.isEndpoint) {
                cheetahRef.current.flush().then(endpointResult => {
                    const final = partialResults + (result.transcript || '') + (endpointResult.transcript || '');
                    setFinalTranscript(final);
                });
            }
        });
        return () => processSuccessSubscription.remove();
    }
  }, [partialResults]);

  useEffect(() => {
    if (finalTranscript) {
      navigation.navigate("Instructions", { recognizedText: finalTranscript });
    }
  }, [finalTranscript, navigation]);

  const startPulse = () => { /* ... unchanged ... */ anim1.setValue(0); anim2.setValue(0); Animated.loop(Animated.parallel([Animated.timing(anim1,{toValue:1,duration:2000,easing:Easing.out(Easing.ease),useNativeDriver:true}),Animated.timing(anim2,{toValue:1,duration:2000,delay:1000,easing:Easing.out(Easing.ease),useNativeDriver:true})])).start(); };
  const stopPulse = () => { /* ... unchanged ... */ anim1.stopAnimation(); anim2.stopAnimation(); };

  // Logic functions remain the same...
  const startListening = async () => {
    // Add safeguard here as well
    if (!cheetahRef.current || !voiceProcessorRef.current) {
      setCheetahError("Engine not ready.");
      return;
    }
    if (voiceProcessorRef.current?.isRecording()) return;
    try {
      await voiceProcessorRef.current.start(cheetahRef.current.frameLength, cheetahRef.current.sampleRate);
      setIsListening(true);
      setPartialResults('');
      setFinalTranscript('');
      setDuration(0);
      startPulse();
      timerInterval.current = setInterval(() => setDuration(prev => prev + 1), 1000);
    } catch (e) {
      setCheetahError("Failed to start microphone.");
      console.error(e);
    }
  };

  const stopListening = async () => {
    if (!voiceProcessorRef.current?.isRecording()) return;
    try {
      await voiceProcessorRef.current.stop();
      setIsListening(false);
      stopPulse();
      if (timerInterval.current) clearInterval(timerInterval.current);
    } catch (e) {
      setCheetahError("Failed to stop microphone.");
      console.error(e);
    }
  };

  const handleMicPress = () => isListening ? stopListening() : startListening();

  // JSX and Styles remain the same...
  const getHeaderText = () => {
    if (cheetahError) return "Error";
    if (!isCheetahReady) return "Initializing Engine...";
    if (isListening) return "Listening...";
    return "Describe the Situation";
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Bar />
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{getHeaderText()}</Text>
          <Text style={styles.subHeader}>All processing is done offline on your device.</Text>
        </View>
        <View style={styles.visualizerContainer}>
            {isListening && <Animated.View style={[styles.ripple, { transform: [{ scale: anim1.interpolate({ inputRange: [0, 1], outputRange: [0, 5] }) }], opacity: anim1.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.3, 0.1, 0] }) }]} />}
            {isListening && <Animated.View style={[styles.ripple, { transform: [{ scale: anim2.interpolate({ inputRange: [0, 1], outputRange: [0, 5] }) }], opacity: anim2.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.3, 0.1, 0] }) }]} />}
            <TouchableOpacity style={[styles.micButton, isListening && styles.micButtonRecording]} onPress={handleMicPress} activeOpacity={0.8} disabled={!isCheetahReady}>
                {!isCheetahReady ? (<ActivityIndicator size="large" color="white" />) : (<Ionicons name={isListening ? "stop" : "mic"} size={40} color="white" />)}
            </TouchableOpacity>
            <Text style={styles.timerText}>{formatTime(duration)}</Text>
        </View>
        <View style={styles.feedbackContainer}>
            <Text style={styles.partialResultsText}>{partialResults || (isCheetahReady ? "Press the button to start..." : "")}</Text>
            <Text style={styles.errorText}>{cheetahError}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
// Styles remain unchanged
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { flex: 1, justifyContent: "space-between", padding: 20, paddingBottom: 40 },
  headerContainer: { alignItems: "flex-start", marginTop: 20 },
  header: { fontFamily: "Poppins_700Bold", fontSize: 32, color: "#1e293b", lineHeight: 40 },
  subHeader: { fontFamily: "Poppins_400Regular", fontSize: 18, color: "#64748b", marginTop: 8 },
  visualizerContainer: { flex: 1, justifyContent: "center", alignItems: "center", width: '100%' },
  ripple: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(59, 130, 246, 1)', position: 'absolute' },
  micButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#3b82f6", justifyContent: "center", alignItems: "center", shadowColor: "#3b82f6", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  micButtonRecording: { backgroundColor: "#ef4444", shadowColor: "#ef4444" },
  timerText: { fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace", fontSize: 20, color: '#64748b', marginTop: 24, letterSpacing: 1 },
  feedbackContainer: { minHeight: 120, justifyContent: 'center', padding: 10, backgroundColor: '#f8fafc', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  partialResultsText: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#475569', textAlign: 'center', lineHeight: 24 },
  errorText: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#ef4444', textAlign: 'center' },
});

export default MicrophoneScreen;