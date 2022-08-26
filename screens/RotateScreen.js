import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import {StyleSheet, Button, View} from 'react-native';
import { Circle } from 'react-native-svg';

export default function RotateScreen() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  return (
    <>
      <View style={{padding: 10, backgroundColor: '#cae7e8', alignItems: 'center'}}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </View>
      <Button
        title="wobble"
        onPress={() => {
          rotation.value = withSequence(
            withTiming(-10, {duration: 50}),
            withRepeat(withTiming(10, {duration: 100}), 6, true),
            withTiming(0, {duration: 50})
          )
        }}
      />
      <Button
        title="spin"
        onPress={() => {
          rotation.value = withSequence(
            withTiming(720, {duration: 5000, easing: Easing.inOut(Easing.circle)}),
            withTiming(0, {duration: 2000})
          )
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    marginBottom: 30,
    backgroundColor: '#40B4C2',
    width: 100,
    height: 100,
    borderRadius: 5,
    borderTopWidth: 15,
    borderTopColor: '#209BBA',
    borderRightWidth: 15,
    borderRightColor: '#42AAC3',
    borderBottomWidth: 15,
    borderBottomColor: '#209BBA',
    borderLeftWidth: 15,
    borderLeftColor: '#42AAC3',
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 15, 
  },
});
