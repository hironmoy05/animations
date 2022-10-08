import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, Easing } from 'react-native-reanimated';

const { width: windowWidth } = Dimensions.get('window');

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FirstAnimation: React.FC = () => {
    const [clicked, setClicked] = useState(false);

    const progress = useSharedValue(1);
    const progressWidth = useSharedValue(10);
    const progressScale = useSharedValue(1);
    const progressRotate = useSharedValue(0);

    const rStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
        borderRadius: progressWidth.value,
        transform: [
            { scale: progressScale.value },
            { rotate: `${progressRotate.value * 2 * Math.PI}rad` }
        ]
    }), []);

    const handlePress = useCallback(() => {
        setClicked(!clicked);

    }, [progress, clicked])


    useEffect(() => {
        progress.value = clicked ? withRepeat(withTiming(.5, { duration: 1000 }), -1, true) : withTiming(1);
        progressWidth.value = clicked ? withRepeat(withTiming(windowWidth / 3, { duration: 1000 }), -1, true) : withTiming((Math.random() * 10) + 5);
        progressScale.value = clicked ? withRepeat(withTiming(1.5, { duration: 1000 }), -1, true) : withTiming(1, { duration: 1000, easing: Easing.bounce });
        progressRotate.value = clicked ? withRepeat(withTiming(1), -1, true) : withTiming(Math.random(), { duration: 1000 });
    }, [clicked])

    return (
        <View style={ [styles.container] }>
            <AnimatedPressable onPress={ handlePress } style={ [styles.animatedBox, rStyle] } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    animatedBox: {
        width: windowWidth / 2,
        height: windowWidth / 2,
        backgroundColor: 'blue'
    }
})

export default FirstAnimation;