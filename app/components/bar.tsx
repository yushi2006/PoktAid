import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

const Bar = () => {
    const navigator = useNavigation();
    const route = useRoute();

    const showBackButton = route.name !== 'Home';
    
    return (
        <View style={styles.container}>
            {showBackButton ? (
                <TouchableOpacity onPress={() => navigator.goBack()}>
                    <Ionicons name='arrow-back' size={24} color='#2596be' />
                </TouchableOpacity>
            ): (<View style={{width: 24}}></View>)}
            <Text style={styles.text}>PoktAid</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    text: {
        paddingLeft: 5,
        color: "#2596be",
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold'
    }
});

export default Bar
