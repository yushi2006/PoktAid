import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Bar from '../components/bar'
import Card from '../components/card'
import NavigationButton from '../components/navigationButton'

const Instructions = () => {
    return(
        <View style={styles.screen}>
            <Bar />
            <View style={styles.main}>
                <View style={styles.container}>
                    <Card title="Some Instruction" describtion="Its Describtion" />
                </View>
                <View style={styles.navigations}>
                    <NavigationButton isBackButton={true} />
                    <NavigationButton isBackButton={false} />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'column',
    },
    main: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        paddingVertical: "25%",
    },
    container: {
        flexDirection: 'column',
        width: '100%',
        height: '70%',
        alignItems: 'center'
    },
    navigations: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
    }
});

export default Instructions;
