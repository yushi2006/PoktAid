import React, { Component } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Bar from '../components/bar'
import InputButton from '../components/inputButton'

const Home = () => {
    const navigator = useNavigation();
    return (
        <View>
            <Bar />
            <View style={styles.textContainer}>
                <Text style={styles.header}>PoktAid</Text>
                <Text style={styles.noworry}>No need to panic, you won't die.</Text>
            </View>
            <View style={styles.container}>
                <InputButton isCamera={true} />
                <InputButton isCamera={false} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '10%',
        paddingBottom: '10%',
        width: '100%',
        height: '80%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        color: '#2596be',
    },
    textContainer: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
    },
    header: {
        color: '#2596be',
        fontWeight: 'bold',
        fontSize: 32,
    },
    noworry: {
        color: 'gray',
    },
});

export default Home
