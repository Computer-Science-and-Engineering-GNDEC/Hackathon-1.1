import {Spinner} from 'native-base';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export const SplashScreen = () => {
  return (
    <View style={styles.spinnerContainer}>
      <Spinner color="#FFBC00" />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: '45%',
    height: '30%',
    maxWidth: 300,
    maxHeight: 200,
  },
});
