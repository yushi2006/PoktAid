import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NavigationButton = ({ isBackButton, isFinishButton, onPress }) => {
    const buttonStyle = isBackButton ? styles.back : (isFinishButton ? styles.finish : styles.next);
    const textStyle = isBackButton ? styles.backText : styles.nextText;
    
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
            {isBackButton && <Ionicons name="arrow-back-outline" size={22} color="#34495e" />}
            <Text style={textStyle}>
                {isBackButton ? "Back" : (isFinishButton ? "Finish" : "Next")}
            </Text>
            {!isBackButton && <Ionicons name={isFinishButton ? 'checkmark-circle-outline' : 'arrow-forward-outline'} size={22} color="white" />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 140,
    },
    back: {
        backgroundColor: '#ecf0f1',
    },
    next: {
        backgroundColor: '#3498db',
    },
    finish: {
      backgroundColor: '#2ecc71', // Success green
    },
    backText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#34495e',
        marginHorizontal: 10,
    },
    nextText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginHorizontal: 10,
    },
});

export default NavigationButton;
