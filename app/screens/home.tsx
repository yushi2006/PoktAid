import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigator = useNavigation();
    return (
        <View>
            <Text>This is the Home page.</Text>
            <Button title='Instructions' onPress={() => navigator.navigate('Instructions')} />
        </View>
    )
}

export default Home
