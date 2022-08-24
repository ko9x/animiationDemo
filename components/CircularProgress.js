import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

export function CircularProgress({
  radius,
  strokeWidth,
  backgroundColor,
  percentageComplete,
}) {
  const innerRadius = radius - strokeWidth / 2;
  const circumfrence = 2 * Math.PI * innerRadius;

  return (
    <View style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <Circle cx={radius} cy={radius} r={radius} fill={backgroundColor} />
      </Svg>
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
