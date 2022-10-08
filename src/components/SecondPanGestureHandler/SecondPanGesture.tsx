import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';

const AnimatedView = Animated.createAnimatedComponent(View);

const SIZE = Dimensions.get('window').width / 3.5;
const CIRCLE = SIZE * 2;

const PanGesture: React.FC = () => {
    const isPressed = useSharedValue(false);
    const start = useSharedValue({ x: 0, y: 0 });

    const pan = Gesture.Pan()
        .onBegin(() => {
            'worklet';
            isPressed.value = true;
            console.log(isPressed)
        })
        .onChange(event => {
            'worklet';

            start.value = {
                x: event.changeX + start.value.x,
                y: event.changeY + start.value.y,
            }
        })
        .onEnd(() => {
            'worklet';

            const distance = Math.sqrt(start.value.x ** 2 + start.value.y ** 2);

            if (distance < CIRCLE * 1.005) {
                start.value = {
                    x: 0,
                    y: 0
                }
            }

        })
        .onFinalize(() => {
            'worklet';

            const distance = Math.sqrt(start.value.x ** 2 + start.value.y ** 2);

            if (distance < CIRCLE * 1.005)
                isPressed.value = false;
        })

    console.log(isPressed)
    const rStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withSpring(start.value.x) },
            { translateY: withSpring(start.value.y) }
        ],
        backgroundColor: isPressed.value ? 'rgba(255, 0, 0, .7)' : 'rgba(0, 0, 255, .5)'
    }), [start, isPressed])

    return (
        <GestureHandlerRootView style={ styles.container }>
            <View style={ styles.circle }>
                <GestureDetector gesture={ pan }>
                    <AnimatedView style={ [styles.square, rStyle] } />
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    square: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 5,
    },
    circle: {
        width: SIZE * 3,
        height: SIZE * 3,
        borderRadius: CIRCLE,
        borderWidth: 4,
        borderColor: 'rgba(0, 0, 255, .5)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PanGesture;