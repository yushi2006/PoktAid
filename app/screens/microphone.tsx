import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button, Text, Alert, TouchableOpacity, SafeAreaView, Animated, Easing, Platform } from 'react-native';
import { useAudioRecorder, RecordingPresets } from 'expo-audio';
import { Audio } from 'expo-av'; // Use Audio module from expo-av for permissions
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Bar from '../components/bar';

// Helper function to format seconds into MM:SS
const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const MicrophoneScreen = () => {
    const navigation = useNavigation();
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const [isRecording, setIsRecording] = useState(false);
    const [duration, setDuration] = useState(0);
    
    // --- CORRECT PERMISSION HANDLING ---
    const [permissionResponse, setPermissionResponse] = useState<Audio.PermissionResponse | null>(null);

    // For the pulsing animation
    const pulseAnim = useRef(new Animated.Value(1)).current;
    
    // For the timer
    const timerInterval = useRef<NodeJS.Timeout | null>(null);

    // Check permissions when component mounts
    useEffect(() => {
        (async () => {
            const response = await Audio.getPermissionsAsync();
            setPermissionResponse(response);
        })();
    }, []);

    // --- Animation Functions (Unchanged) ---
    const startPulse = () => { /* ... same as before ... */ };
    const stopPulse = () => { /* ... same as before ... */ };
    // (I've hidden the animation code for brevity, it's identical to the previous version)

    const requestPermission = async () => {
        const response = await Audio.requestPermissionsAsync();
        setPermissionResponse(response);
    };

    const startRecording = async () => {
        try {
            // Re-check permissions just in case they were changed in settings
            if (permissionResponse?.status !== 'granted') {
                Alert.alert("Permission Required", "Please grant microphone permissions to record audio.");
                await requestPermission();
                return;
            }
            await audioRecorder.prepareToRecordAsync();
            await audioRecorder.record();
            setIsRecording(true);
            // startPulse(); // Will add this back

            // Start timer
            timerInterval.current = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);

        } catch (error) {
            console.error("Failed to start recording", error);
            Alert.alert("Error", "Could not start recording.");
        }
    };

    const stopRecording = async () => {
        try {
            const uri = await audioRecorder.stop(); // This also cleans up the recording
            setIsRecording(false);
            // stopPulse(); // Will add this back

            if (timerInterval.current) {
                clearInterval(timerInterval.current);
            }
            
            setDuration(0); // Reset for next time
        } catch (error) {
            console.error("Failed to stop recording", error);
            Alert.alert("Error", "Could not stop recording.");
        }
    };
    
    // Clean up the timer when the component unmounts
    useEffect(() => {
        return () => {
            if (timerInterval.current) {
                clearInterval(timerInterval.current);
            }
        };
    }, []);

    // --- PERMISSION RENDER LOGIC ---
    if (!permissionResponse) {
        // Permissions are still being checked
        return <View style={styles.screen}><Bar /></View>; 
    }

    if (permissionResponse.status !== 'granted') {
        return (
            <SafeAreaView style={styles.screen}>
                <Bar />
                <View style={styles.permissionContainer}>
                    <Ionicons name="mic-off-circle-outline" size={80} color="#7f8c8d" />
                    <Text style={styles.permissionMessage}>Microphone Access Needed</Text>
                    <Text style={styles.permissionSubMessage}>
                        PoktAid needs access to your microphone to allow you to describe your injury. Your recording is only used for analysis.
                    </Text>
                    <Button onPress={requestPermission} title="Grant Permission" />
                </View>
            </SafeAreaView>
        );
    }

    // --- MAIN RENDER LOGIC ---
    return (
        <SafeAreaView style={styles.screen}>
            <Bar />
            <View style={styles.content}>
                <View style={styles.guidanceContainer}>
                    <Text style={styles.guidanceTitle}>
                        {isRecording ? "Recording..." : "Ready to Record"}
                    </Text>
                    <Text style={styles.guidanceText}>
                        Press the button and clearly describe the injury, its location, and what happened.
                    </Text>
                </View>

                <View style={styles.visualizerContainer}>
                     <Animated.View style={[styles.pulse, { transform: [{ scale: pulseAnim }] }]}>
                        <Text style={styles.timerText}>{formatTime(duration)}</Text>
                    </Animated.View>
                </View>

                <View style={styles.controlsContainer}>
                    <TouchableOpacity
                        style={[styles.micButton, isRecording && styles.micButtonRecording]}
                        onPress={isRecording ? stopRecording : startRecording}
                        activeOpacity={0.7}
                    >
                        <Ionicons name={isRecording ? "stop" : "mic"} size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 50,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  permissionMessage: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
  },
  permissionSubMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 30,
    lineHeight: 24,
  },
  guidanceContainer: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '10%',
  },
  guidanceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  guidanceText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  visualizerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(52, 152, 219, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: '300',
    color: '#2c3e50',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  controlsContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 8,
  },
  micButtonRecording: {
    backgroundColor: '#e74c3c',
  },
});


export default MicrophoneScreen;