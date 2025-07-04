import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Bar from '../components/bar'
import Card from '../components/card'

const Instructions = () => {
    return(
        <View>
            <Bar />
            <View style={styles.main}>
                <Card title="Some Instruction" describtion="Its Describtion" />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        paddingVertical: "25%",
    }
});

export default Instructions;
