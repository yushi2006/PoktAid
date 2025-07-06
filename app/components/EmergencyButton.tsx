import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmergencyButton = () => {
    
    // Use your country's emergency number
    const emergencyNumber = '911'; 

    const handlePress = () => {
        const phoneUrl = `tel:${emergencyNumber}`;
        Linking.canOpenURL(phoneUrl)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Cannot make call', `Unable to open the phone dialer.`);
                } else {
                    return Linking.openURL(phoneUrl);
                }
            })
            .catch(err => console.error('An error occurred', err));
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
            <Ionicons name="call-outline" size={22} color="#FFFFFF" />
            <Text style={styles.text}>Call Emergency Services</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ef4444', // A calm but distinct red (red-500)
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 16,
        // Shadow for emphasis
        shadowColor: "#ef4444",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    text: {
        color: '#FFFFFF',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        marginLeft: 10,
    }
});

export default EmergencyButton;