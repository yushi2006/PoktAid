import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const InstructionCard = ({ step, title, description }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.stepText}>{step}</Text>
            <Text style={styles.titleText}>{title}</Text>
            <View style={styles.divider} />
            <Text style={styles.descriptionText}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 20,
        width: '90%',
        minHeight: '60%', // Use minHeight for flexibility
        padding: 30,
        // iOS Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        // Android Shadow
        elevation: 5,
    },
    stepText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3498db',
        marginBottom: 8,
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#ecf0f1',
        width: '100%',
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 18,
        color: '#34495e',
        lineHeight: 26, // Crucial for readability
    }
});

export default InstructionCard;
