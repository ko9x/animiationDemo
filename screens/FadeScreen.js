import React, {useEffect, useState} from 'react';
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
  const [fadeOut, setFadeOut] = useState(true);
  let fadeAnim = new Animated.Value(fadeOut ? 1 : 0);

  const animate = (easing, duration) => {
    fadeAnim.setValue(fadeOut ? 1 : 0);
    Animated.timing(fadeAnim, {
      toValue: fadeOut ? 0 : 1,
      delay: 500,
      duration: duration,
      easing,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        // console.log('Fade animation finished')
      }
    });
  };

  const animatedStyles = [
    styles.box,
    {
      opacity: fadeAnim,
      width: 100,
      height: 100,
    },
  ];

  function toggleFade() {
    setFadeOut(prevState => !prevState);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All animations have a half second delay</Text>
      <Text style={styles.title}>{`Current fade setting: (${
        fadeOut ? 'Fade out' : 'Fade in'
      })`}</Text>
      <Button onPress={() => toggleFade()} title="Toggle fade" />
      <View style={styles.boxContainer}>
        <Animated.View style={animatedStyles} />
      </View>
      <SectionList
        style={styles.list}
        sections={SECTIONS}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => animate(item.easing, item.duration)}
            style={styles.listRow}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
      />
    </View>
  );
}

const SECTIONS = [
  {
    title: 'Predefined animations',
    data: [
      {title: 'Bounce', easing: Easing.bounce, duration: 1800},
      {title: 'Ease', easing: Easing.ease},
      {title: 'Elastic', easing: Easing.elastic(8), duration: 3000},
    ],
  },
  {
    title: 'Standard functions',
    data: [
      {title: 'Linear', easing: Easing.linear},
      {title: 'Quad', easing: Easing.quad},
      {title: 'Cubic', easing: Easing.cubic},
    ],
  },
  {
    title: 'Additional functions',
    data: [
      {
        title: 'Bezier',
        easing: Easing.bezier(0, 5, 1, -1),
        duration: 2000,
      },
      {title: 'Circle', easing: Easing.circle},
      {title: 'Sin', easing: Easing.sin},
      {title: 'Exp', easing: Easing.exp},
    ],
  },
  {
    title: 'Combinations',
    data: [
      {
        title: 'In + Bounce',
        easing: Easing.in(Easing.bounce),
      },
      {
        title: 'Out + Exp',
        easing: Easing.out(Easing.exp),
      },
      {
        title: 'InOut + Elastic',
        easing: Easing.inOut(Easing.elastic(1)),
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
    height: 160,
    alignItems: 'center',
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: '#61dafb',
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
