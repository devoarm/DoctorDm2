import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {store} from './src/app/store';
import {Provider} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import InitNavigation from './src/navigation';


const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider
        settings={{
          icon: props => <FontAwesome5 {...props} />,
        }}>
        <NavigationContainer>
          <InitNavigation />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
