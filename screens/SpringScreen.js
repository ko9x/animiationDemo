import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import {StyleSheet, Button, View, Text} from 'react-native';

export default function RandomXScreen() {
  const offset = useSharedValue(0);

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      // Default is damping: 10, stiffness: 100
      transform: [{translateX: withSpring(offset.value)}],
    };
  });
  const customSpringStylesA = useAnimatedStyle(() => {
    return {
      transform: [
        // Default is damping: 10, stiffness: 100
        {translateX: withSpring(offset.value, {damping: 1, stiffness: 100})},
      ],
    };
  });
  const customSpringStylesB = useAnimatedStyle(() => {
    return {
      transform: [
        // Default is damping: 10, stiffness: 100
        {translateX: withSpring(offset.value, {damping: 20, stiffness: 5})},
      ],
    };
  });

  return (
    <>
      <View style={{padding: 10, backgroundColor: '#7e7e7e'}}>
        <Text>Default</Text>
        <Animated.View style={[styles.box, defaultSpringStyles]} />
      </View>
      <View style={{padding: 10, backgroundColor: '#a0a0a0'}}>
        <Text>Low damping</Text>
        <Animated.View style={[styles.box, customSpringStylesA]} />
      </View>
      <View style={{padding: 10, backgroundColor: '#c9c9c9'}}>
        <Text>Low stiffness</Text>
        <Animated.View style={[styles.box, customSpringStylesB]} />
      </View>

      <Button
        onPress={() => {
          offset.value = Math.random() * 255;
        }}
        title="Spring"
      />
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    marginBottom: 30,
    backgroundColor: '#2DA0ED',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderRightWidth: 3,
    borderRightColor: '#3170Dd',
    borderBottomWidth: 12,
    borderBottomColor: '#3170DE',
    borderLeftWidth: 3,
    borderLeftColor: '#3170DE',
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: { width: 5, height: 15 },
    shadowRadius: 15, 
  },
});
