import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Bar from '../components/bar';
import ActionCard from '../components/ActionCard';

const Home = () => {
    const navigator = useNavigation();
    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar barStyle="dark-content" />
            <Bar />
            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Your First-Aid Assistant</Text>
                    <Text style={styles.subHeader}>How can we help you today?</Text>
                </View>

                <ActionCard
                    onPress={() => navigator.navigate("CameraScreen")}
                    iconName="camera-outline"
                    title="Scan Injury"
                    description="Use your camera to identify the issue"
                />

                <ActionCard
                    onPress={() => console.log('Audio')}
                    iconName="mic-outline"
                    title="Describe Injury"
                    description="Explain the situation with your voice"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f7f8fa', // A very light, calming gray
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    header: {
        color: '#2c3e50',
        fontWeight: 'bold',
        fontSize: 26,
    },
    subHeader: {
        color: '#7f8c8d',
        fontSize: 16,
        marginTop: 8,
    },
});

export default Home;
