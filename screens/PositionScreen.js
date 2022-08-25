import React, {useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Text,
  View,
  Button,
} from 'react-native';

export default function EasingScreen() {
  let positionAnim = new Animated.Value(0);
  const [isVertical, setIsVertical] = useState(true);
  const [isReversed, setIsReversed] = useState(false);

  const animate = (easing, duration) => {
    positionAnim.setValue(0);
    Animated.timing(positionAnim, {
      toValue: isVertical ? 20 : 200,
      duration,
      easing: isReversed ? Easing.out(easing) : Easing.in(easing),
      useNativeDriver: false,
    }).start();
  };

  const position = positionAnim.interpolate({
    // outputRange allows us to better define what we want to do.
    // think of it this way, outputRange: [red, green]
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = {
    transform: [
      isVertical ? {translateY: positionAnim} : {translateX: positionAnim},
    ],
  };

  function changeAxis() {
    setIsVertical(prevState => !prevState);
  }

  function changeDirection() {
    setIsReversed(prevState => !prevState);
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{alignItems: 'center'}}>
          <Button onPress={() => changeAxis()} title="Change axis"></Button>
          <Text style={{color: 'white'}}>
            Current axis = {isVertical ? 'Y' : 'X'}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Button
            onPress={() => changeDirection()}
            title="Change direction"></Button>
          <Text style={{color: 'white'}}>
            Current direction = {isReversed ? 'Easing.out' : 'Easing.in'}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.boxContainer,
          {alignItems: isVertical ? 'center' : null},
        ]}>
        <Animated.View style={[styles.box, animatedStyles]} />
        {isVertical && <View style={{width: 300, borderBottomWidth: 0.2, borderBottomColor: 'white', marginTop: 20}}></View>}
      </View>
      <SectionList
        style={styles.list}
        sections={SECTIONS}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => animate(item.easing, item.duration)}
            style={styles.listRow}>
            <View style={{flexDirection: 'row'}}>
              <Text>{item.title}</Text>
              <Text style={{color: 'grey', paddingLeft: 5}}>
                {item.subTitle}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section: {title, subTitle}}) => (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.listHeader}>{title}</Text>
            <Text
              style={[
                styles.listHeader,
                {textTransform: 'lowercase', color: 'black'},
              ]}>
              {subTitle}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const SECTIONS = [
  {
    title: 'Predefined animations',
    subTitle: '',
    data: [
      {
        title: 'Back ',
        subTitle: 'animates back slightly as the animation starts',
        easing: Easing.back(10),
        duration: 1500,
      },
      {
        title: 'Bounce',
        subTitle: 'Provides a basic bouncing effect',
        easing: Easing.bounce,
        duration: 1800,
      },
      {
        title: 'Ease',
        subTitle: 'similar to an object slowly accelerating to speed',
        easing: Easing.ease,
      },
      {
        title: 'Elastic',
        subTitle: 'Similar to a spring oscillating back and forth',
        easing: Easing.elastic(8),
        duration: 5000,
      },
    ],
  },
  {
    title: 'Standard functions',
    subTitle: '',
    data: [
      {
        title: 'Linear',
        subTitle: 'Position correlates to elapsed time one to one',
        easing: Easing.linear,
      },
      {
        title: 'Quad',
        subTitle: 'Position equals the square of elapsed time',
        easing: Easing.quad,
      },
      {
        title: 'Cubic',
        subTitle: 'Position equals the cube of elapsed time',
        easing: Easing.cubic,
      },
    ],
  },
  {
    title: 'Additional functions',
    subTitle: '',
    data: [
      {
        title: 'Bezier',
        subTitle: 'Provides a cubic bezier curve',
        easing: Easing.bezier(0, 5, 1, -1),
        duration: 2000,
      },
      {
        title: 'Circle',
        subTitle: 'A circular function. Starts slow, ends fast',
        easing: Easing.circle,
        duration: 2000,
      },
      {title: 'Sin', subTitle: 'A sinusoidal function', easing: Easing.sin},
      {title: 'Exp', subTitle: 'An exponential function', easing: Easing.exp},
    ],
  },
  {
    title: 'Combinations',
    data: [
      {
        title: 'In + Circle',
        subTitle: 'Starts slow ends fast.',
        easing: Easing.in(Easing.circle),
        duration: 2000,
      },
      {
        title: 'Out + Circle',
        subTitle: 'Reverse of In + Circle',
        easing: Easing.out(Easing.circle),
        duration: 2000,
      },
      {
        title: 'InOut + Circle',
        subTitle: 'Does Circle + In and then reverses it',
        easing: Easing.inOut(Easing.circle),
        duration: 2000,
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232a',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    color: '#61dafb',
  },
  boxContainer: {
    height: 180,
    borderBottomColor: 'white',
    borderBottomWidth: 10
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: '#61dafb',
    height: 100,
    width: 100,
    borderRadius: 20
  },
  list: {
    backgroundColor: '#fff',
  },
  listHeader: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f4f4f4',
    color: '#999',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  listRow: {
    padding: 8,
  },
});
