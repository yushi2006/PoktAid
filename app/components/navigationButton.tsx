import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const NavigationButton = ({isBackButton}) => {
    const navigator = useNavigation();
    return (
        <View>
            {isBackButton ? (
                <TouchableOpacity onPress={() => navigator.goBack()} style={styles.back}>
                    <Ionicons name="arrow-back-outline" />
                    <Text>Back</Text>
                </TouchableOpacity>
                ): (
                    <TouchableOpacity style={styles.next}>
                        <Text>Next</Text>
                        <Ionicons name='arrow-forward-outline' />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    back: {
        backgroundColor: '#CECDCC',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    next: {
        backgroundColor: '#2596be',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default NavigationButton
