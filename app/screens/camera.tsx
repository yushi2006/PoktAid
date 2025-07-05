import React, { useState, useRef } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { Ionicons } from '@expo/vector-icons'; // We'll use icons for a cleaner UI

const CameraScreen = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    // --- Permission Handling (Good as it is) ---
    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionMessage}>We need your permission to access the camera.</Text>
                <Text style={styles.permissionSubMessage}>This allows you to take a photo of an injury for first-aid analysis.</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    // --- Camera Control Functions ---
    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const toggleFlash = () => {
        setFlash(current => {
            if (current === 'off') return 'on';
            if (current === 'on') return 'auto';
            return 'off'; // from 'auto' to 'off'
        });
    }
    
    // Get the right icon for the current flash mode
    const getFlashIcon = () => {
        if (flash === 'on') return 'flash';
        if (flash === 'auto') return 'flash-outline';
        return 'flash-off';
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
                console.log(photo); // { uri, width, height, ... }
                // --- NEXT STEP ---
                // Here, you would navigate to the next screen, passing the photo.uri
                // For example: navigation.navigate('AnalysisScreen', { photoUri: photo.uri });
                Alert.alert("Photo Taken!", `Photo saved at: ${photo.uri}`);

            } catch (error) {
                console.error("Failed to take picture:", error);
                Alert.alert("Error", "Could not take picture. Please try again.");
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
            >
                {/* Guidance UI */}
                <View style={styles.guidanceOverlay}>
                    <Text style={styles.guidanceText}>
                        Place the injury inside the frame
                    </Text>
                    <View style={styles.focusFrame} />
                </View>

                {/* Controls UI */}
                <View style={styles.controlsContainer}>
                    {/* Flash Button */}
                    <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
                        <Ionicons name={getFlashIcon()} size={30} color="white" />
                        <Text style={styles.controlButtonText}>{flash}</Text>
                    </TouchableOpacity>

                    {/* Shutter Button */}
                    <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
                         <View style={styles.shutterButtonInner} />
                    </TouchableOpacity>

                    {/* Flip Camera Button */}
                    <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
                        <Ionicons name="camera-reverse" size={30} color="white" />
                        <Text style={styles.controlButtonText}>Flip</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

// --- New Stylesheet for the Redesigned UI ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  permissionMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  permissionSubMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  // --- Guidance UI Styles ---
  guidanceOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guidanceText: {
    position: 'absolute',
    top: '15%',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  focusFrame: {
    width: '85%',
    aspectRatio: 3 / 4, // Portrait orientation for body parts
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderStyle: 'dashed',
    borderRadius: 16,
  },
  // --- Controls UI Styles ---
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  shutterButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  shutterButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  controlButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70, // Provide ample touch space
  },
  controlButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    textTransform: 'capitalize'
  }
});

export default CameraScreen;