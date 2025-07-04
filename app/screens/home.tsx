import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Bar from '../components/bar'

const Home = () => {
    const navigator = useNavigation();
    return (
        <View>
            <Bar />
            <Text>This is the Home page.</Text>
            <Button title='Instructions' onPress={() => navigator.navigate('Instructions')} />
        </View>
    )
}

export default Home
