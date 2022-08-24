import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {StyleSheet, Button} from 'react-native';

export default function RandomXScreen() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });

  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button
        onPress={() => (offset.value = Math.random() * 255)}
        title="Move"
      />
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'blue',
    width: 100,
    height: 100,
    borderRadius: 20
  },
});
