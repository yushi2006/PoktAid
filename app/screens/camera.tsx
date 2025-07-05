import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

const CameraScreen = () => {
  const navigation = useNavigation();

  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionMessage}>
          We need your permission to access the camera.
        </Text>
        <Text style={styles.permissionSubMessage}>
          This allows you to take a photo of an injury for first-aid analysis.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () =>
    setFacing((current) => (current === "back" ? "front" : "back"));

  const toggleFlash = () =>
    setFlash((current) => (current === "off" ? "on" : "auto"));

  const getFlashIcon = () => {
    if (flash === "on") return "flash";
    if (flash === "auto") return "flash-outline";
    return "flash-off";
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
        });

        navigation.navigate("Instructions", { photoUri: photo.uri });
      } catch (error) {
        console.error("Failed to take picture:", error);
        // Alert the user if the camera fails
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash={flash}
        // Disabling barcode scanner for performance, if not needed
        barcodeScannerSettings={{
          barcodeTypes: [],
        }}
      >
        {/* ... (Your camera UI remains the same) ... */}
        <View style={styles.guidanceOverlay}>
          <Text style={styles.guidanceText}>
            Place the injury inside the frame
          </Text>
          <View style={styles.focusFrame} />
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
            <Ionicons name={getFlashIcon()} size={30} color="white" />
            <Text style={styles.controlButtonText}>{flash}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
            <View style={styles.shutterButtonInner} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse" size={30} color="white" />
            <Text style={styles.controlButtonText}>Flip</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  permissionMessage: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  permissionSubMessage: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  // --- Guidance UI Styles ---
  guidanceOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  guidanceText: {
    position: "absolute",
    top: "15%",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  focusFrame: {
    width: "85%",
    aspectRatio: 3 / 4,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.8)",
    borderStyle: "dashed",
    borderRadius: 16,
  },
  // --- Controls UI Styles ---
  controlsContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  shutterButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  shutterButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  controlButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
  },
  controlButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
    textTransform: "capitalize",
  },
});

export default CameraScreen;
