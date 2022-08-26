import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {StyleSheet, View, Text} from 'react-native';

export default function BallScreen() {
  const pressed = useSharedValue(false);
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
    },
    onActive: (event, ctx) => {
        console.log('event', event)
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
    //   backgroundColor: pressed.value ? '#FFC17A' : '#D9685B',
      transform: [{scale: withTiming(pressed.value ? 1.2 : 1)}, {translateX: x.value}, {translateY: y.value}],
    };
  });

  return (
    <View
      style={{
        backgroundColor: '#FCE6B8',
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}>
      <Text style={{marginTop: 10, fontSize: 20, color: '#585885'}}>Press and slide</Text>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.ball, animatedStyle]} />
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  ball: {
    marginTop: 50,
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#D9685B',
    borderRightWidth: 3,
    borderRightColor: '#961E1E',
    borderBottomWidth: 12,
    borderBottomColor: '#961E1E',
    borderLeftWidth: 3,
    borderLeftColor: '#961E1E',
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: {width: 2, height: 20},
    shadowRadius: 10,
  },
});
