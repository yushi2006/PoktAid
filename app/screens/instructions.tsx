import React, { Component, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Bar from '../components/bar'
import Card from '../components/card'
import NavigationButton from '../components/navigationButton'

const Instructions = () => {
    const instructions = [
        { id: 1, title: "Step 1", text: "Do the first thing." },
        { id: 2, title: "Step 2", text: "Now do this." },
        { id: 3, title: "Step 3", text: "Finally, complete this step." }
    ];

    const [idx, setIdx] = useState(0);

    return(
        <View style={styles.screen}>
            <Bar />
            <View style={styles.main}>
                <View style={styles.container}>
                    <Card title={instructions[idx]['title']} describtion={instructions[idx]['text']} />
                </View>
                <View style={styles.navigations}>
                    {idx > 0 ?(
                        <NavigationButton isBackButton={true} _press_fn={() => setIdx(idx => idx - 1)} />
                    ): (<View style={styles.space} />)
                    }
                    {idx < instructions.length - 1 ?
                        (<NavigationButton isBackButton={false} _press_fn={() => setIdx(idx => idx + 1)} />): (<View style={styles.space} />)
                    }
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
    },
    space: {
        paddingHorizontal: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default Instructions;
