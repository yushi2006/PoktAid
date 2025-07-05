import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const InputButton = ({isCamera}) => {
    return (
        <View style={styles.container}>
            {isCamera ? (
                <TouchableOpacity onPress={() => console.log("Camera")} style={styles.button}>
                    <Ionicons name="camera-outline" color={'white'} size={48} />
                    <Text style={styles.text}>Take a photo of the case</Text>
                </TouchableOpacity>
            ): (
                <TouchableOpacity onPress={() => console.log("Microphone")} style={styles.button}>
                    <Ionicons name="mic-outline" color={'white'} size={48} />
                    <Text style={styles.text}>Explain the case</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: 'column',
        width: '80%',
        height: '50%',
        alignItems: 'center',
    },
    button: {
        width: '60%',
        height: '50%',
        backgroundColor: '#2596be',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        flexDirection: 'column'
    },
    text: {
        color: 'white',
    },
});

export default InputButton
