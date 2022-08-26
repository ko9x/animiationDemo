import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

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

  return (
    <TapGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[styles.ball]} />
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  ball: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#B94A4A',
    borderRightWidth: 3,
    borderRightColor: '#BD1A1A',
    borderBottomWidth: 12,
    borderBottomColor: '#BD1A1A',
    borderLeftWidth: 3,
    borderLeftColor: '#BD1A1A',
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: {width: 2, height: 20},
    shadowRadius: 15,
  },
});
