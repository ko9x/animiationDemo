import React, {useRef, useEffect, useState} from 'react';
import {View, Button, SafeAreaView, FlatList, StatusBar} from 'react-native';
import SizeScreen from './screens/SizeScreen';
import FadeScreen from './screens/FadeScreen';
import PositionScreen from './screens/PositionScreen';
import ProgressCircleScreen from './screens/ProgressCircleScreen';
import SpringScreen from './screens/SpringScreen';

export default function App() {
  const [selected, setSelected] = useState({
    name: 'fade',
    screen: <FadeScreen />,
    id: 1,
  });

  const screens = [
    {name: 'fade', screen: <FadeScreen />, id: 1},
    {name: 'size', screen: <SizeScreen />, id: 2},
    {name: 'position', screen: <PositionScreen />, id: 3},
    {name: 'progress', screen: <ProgressCircleScreen />, id: 4},
    {name: 'spring', screen: <SpringScreen />, id: 5},
  ];

  function itemToRender({item}) {
    return (
      <View>
        <Button
          onPress={() => setSelected(item)}
          color={item.id === selected.id ? null : 'grey'}
          title={item.name}></Button>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <StatusBar hidden={true} />
      <View
        style={{
          alignItems: 'center',
          width: '90%',
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}>
        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          horizontal
          data={screens}
          renderItem={itemToRender}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{flex: 10, width: '100%'}}>{selected.screen}</View>
    </SafeAreaView>
  );
}
