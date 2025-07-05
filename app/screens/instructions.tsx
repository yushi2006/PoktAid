import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Bar from '../components/bar';
import InstructionCard from '../components/card';
import NavigationButton from '../components/navigationButton';
import { useNavigation } from '@react-navigation/native';


const Instructions = () => {
    const navigator = useNavigation();
    // Example instructions - you would fetch these based on the injury
    const instructions = [
        { id: 1, title: "Assess the Situation", text: "Ensure the area is safe for you and the injured person. Put on disposable gloves if available." },
        { id: 2, title: "Stop the Bleeding", text: "Apply firm, direct pressure on the cut or wound with a clean cloth, tissue, or piece of gauze." },
        { id: 3, title: "Clean the Wound", text: "Gently clean the wound with warm water and mild soap. Avoid using hydrogen peroxide as it can damage tissue." },
        { id: 4, title: "Apply an Antibiotic", text: "Apply a thin layer of an antibiotic cream or ointment (Neosporin, Polysporin) to help keep the surface moist." },
        { id: 5, title: "Cover the Wound", text: "Cover the wound with a sterile bandage. Change the dressing at least once a day or whenever it becomes wet or dirty." },
    ];

    const [idx, setIdx] = useState(0);
    const isLastStep = idx === instructions.length - 1;

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar barStyle="dark-content" />
            <Bar />
            <View style={styles.main}>
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>Step {idx + 1} of {instructions.length}</Text>
                </View>

                <View style={styles.cardContainer}>
                    <InstructionCard
                        step={`Step ${instructions[idx].id}`}
                        title={instructions[idx].title}
                        description={instructions[idx].text}
                    />
                </View>

                <View style={styles.navigationContainer}>
                    {idx > 0 ? (
                        <NavigationButton isBackButton={true} onPress={() => setIdx(idx - 1)} />
                    ) : (
                        <View style={styles.buttonSpacer} /> // Keeps "Next" button on the right
                    )}

                    <NavigationButton 
                        isBackButton={false}
                        isFinishButton={isLastStep}
                        onPress={() => {
                            if (isLastStep) {
                                navigator.navigate('Home'); // Or a "Completed" screen
                            } else {
                                setIdx(idx + 1)
                            }
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f7f8fa',
    },
    main: {
        flex: 1,
        justifyContent: 'space-between', // Pushes nav to bottom
        paddingBottom: 30,
    },
    progressContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    progressText: {
        fontSize: 16,
        color: '#7f8c8d',
        fontWeight: '600',
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', // Card starts from top
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonSpacer: {
        minWidth: 140, // Same width as the button to maintain layout
    },
});

export default Instructions;
