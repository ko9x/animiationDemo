import React from 'react';
import {View, PixelRatio, StyleSheet} from 'react-native';
import {CircularProgress} from '../components/CircularProgress';

const radius = PixelRatio.roundToNearestPixel(130);
const STROKE_WIDTH = 30;

export default function ProgressCircleScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.ringChartContainer}>
        <CircularProgress
          strokeWidth={STROKE_WIDTH}
          radius={radius}
          backgroundColor="#f93986"
          percentageComplete={85}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringChartContainer: {
    width: radius * 2,
    height: radius * 2,
  },
});
