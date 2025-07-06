import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Pressable, // Use Pressable for better feedback
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CameraScreen = () => {
  const navigation = useNavigation();
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <Ionicons name="camera-outline" size={80} color="#64748b" />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionText}>
          This allows the app to take a photo of an injury for first-aid analysis. Your photos are processed securely.
        </Text>
        {/* --- THIS IS THE CORRECTED PART --- */}
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  const handlePressIn = () => Animated.spring(scaleAnim, { toValue: 0.9, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  const toggleCameraFacing = () => setFacing((current) => (current === "back" ? "front" : "back"));
  const toggleFlash = () => setFlash((current) => (current === "off" ? "on" : "off")); // Simplified 2-state toggle
  const getFlashIcon = () => flash === "on" ? "flash" : "flash-off";
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
        navigation.navigate("Instructions", { photoUri: photo.uri });
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} flash={flash}>
        <SafeAreaView style={styles.uiContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Position Injury in Frame</Text>
            <View style={{width: 44}} />
          </View>

          <View style={styles.focusFrameContainer}>
            <View style={styles.focusFrame} />
          </View>
          
          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
              <Ionicons name={getFlashIcon()} size={26} color="white" />
            </TouchableOpacity>
            
            <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={takePicture}>
              <Animated.View style={[styles.shutterButton, { transform: [{ scale: scaleAnim }] }]} />
            </Pressable>
            
            <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#FFFFFF",
  },
  permissionTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
    textAlign: "center",
    color: "#1e293b",
    marginTop: 20,
  },
  permissionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    textAlign: "center",
    color: "#64748b",
    marginTop: 10,
    lineHeight: 24,
  },
  permissionButton: {
      marginTop: 30,
      backgroundColor: '#3b82f6',
      paddingVertical: 14,
      paddingHorizontal: 30,
      borderRadius: 12,
  },
  permissionButtonText: {
      color: 'white',
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 16,
  },
  camera: { flex: 1 },
  uiContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  backButton: {
      padding: 10,
      marginLeft: -10,
  },
  headerText: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  focusFrameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusFrame: {
    width: "90%",
    aspectRatio: 3 / 4,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.7)",
    borderStyle: "dashed",
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.05)'
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  shutterButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraScreen;