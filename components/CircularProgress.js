import React, {FC} from 'react';
import {View, StyleSheet, Animated, Button} from 'react-native';
import {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function CircularProgress({
  radius,
  strokeWidth,
  backgroundColor,
  percentageComplete,
}) {
  const innerRadius = radius - strokeWidth / 2;
  const circumfrence = 2 * Math.PI * innerRadius;
  const invertedCompletion = (100 - percentageComplete) / 100;

  const theta = useSharedValue(2 * Math.PI * 1.001);
  const animateTo = useDerivedValue(() => 2 * Math.PI * invertedCompletion);

  const animatedProps = useAnimatedProps(() => {
    console.log('thisRan', theta.value ); //@DEBUG
    return {
      strokeDashoffset: withTiming(theta.value * innerRadius, {
        duration: 1500,
      }),
    };
  });

  console.log('animateTo.value', animateTo.value); //@DEBUG
  console.log('theta.value', theta.value); //@DEBUG

  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={radius}
          cy={radius}x
          fill={'transparent'}
          r={innerRadius}
          stroke={backgroundColor}
          strokeDasharray={`${circumfrence} ${circumfrence}`}
          strokeWidth={strokeWidth}
        //   strokeDashoffset={2 * Math.PI * (innerRadius * 0.5)}
          strokeLinecap="round"
        />
      </Svg>
      <Button
        title='Animate'
        onPress={() => {
            theta.value = animateTo.value;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
