import React, {useState} from 'react';
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
import {StyleSheet, View, Text, Button} from 'react-native';

export default function BallScreen() {
  const pressed = useSharedValue(false);
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);
  const [isSpringBack, setIsSpringBack] = useState(true);

  function toggleSpringBack() {
    setIsSpringBack(prevState => !prevState);
  }

  // eventHandler is setting the value of pressed, startingPosition, x, and y depending on our gestures.
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      console.log('started', event ); //@DEBUG
      pressed.value = true;
      if (!isSpringBack) {
        ctx.startX = x.value
        ctx.startY = y.value
      }
    },
    onActive: (event, ctx) => {
      console.log('ctx.startX', ctx.startX ); //@DEBUG
      console.log('PositionX', event.translationX); //@DEBUG
      console.log('VelocityX', event.velocityX); //@DEBUG
      x.value = isSpringBack ? startingPosition + event.translationX : ctx.startX + event.translationX;
      y.value = isSpringBack ? startingPosition + event.translationY : ctx.startY + event.translationY;
    },
    //   // onEnd only fires if onActive fired
    // onEnd: (event, ctx) => {
    //   console.log('ended', event); //@DEBUG
    //   pressed.value = false;
    //   x.value = withSpring(startingPosition);
    //   y.value = withSpring(startingPosition);
    // },
    onFinish: (event, ctx) => {
      console.log('finished', ); //@DEBUG
      pressed.value = false;
      if(isSpringBack) {
        x.value = withSpring(startingPosition);
        y.value = withSpring(startingPosition);
      }
    }
  });

  // animatedStyle is controlling the animation of the ball. Changing it's size (scale) and it's location (translateX and translateY) on the screen. 
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: withTiming(pressed.value ? 1.2 : 1)}, {translateX: x.value}, {translateY: y.value}],
    };
  });

  return (
    <View
      style={styles.container}>
      <Text style={styles.title}>Press and slide</Text>
      <Button onPress={() => toggleSpringBack()} title='toggle drop animation'></Button>
      <Text>Current animation style: {isSpringBack ? 'spring back' : 'drop in place'}</Text>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.ball, animatedStyle]} />
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCE6B8',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    marginTop: 10,
     fontSize: 20,
     color: '#585885'
  },
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
