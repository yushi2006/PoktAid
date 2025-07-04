import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Card = ({ title, describtion }) => {
    return (
        <View style={styles.card}>
            <Text>{title}</Text>
            <Text>{describtion}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#CAC9C9",
        borderRadius: 50,
        width: '80%',
        height: '40%',
        padding: 30,
    },
    text: {
        fontSize: 24,
    }
});

export default Card
