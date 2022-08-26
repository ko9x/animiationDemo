import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {StyleSheet, View, Text} from 'react-native';

export default function BallScreen() {
  const pressed = useSharedValue(false);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#FFC17A' : '#D9685B',
      transform: [{scale: pressed.value ? 1.2 : 1}],
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
      <TapGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.ball, animatedStyle]} />
      </TapGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  ball: {
    margin: 20,
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
    shadowOpacity: 1,
    shadowOffset: {width: 2, height: 20},
    shadowRadius: 15,
  },
});
