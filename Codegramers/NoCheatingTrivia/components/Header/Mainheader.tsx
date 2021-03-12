import {DrawerActions} from '@react-navigation/native';
import {Body, Left, Title, Header} from 'native-base';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
// import FitImage from 'react-native-fit-image';

interface Props {
  title: string;
  navigation: any;
}

export const MainHeader = ({title, navigation}: Props) => {
  return (
    <Header
      hasTabs
      style={{
        backgroundColor: '#fff',
      }}
      // androidStatusBarColor='#fff'
      iosBarStyle="light-content">
      <Left>
        <TouchableOpacity
          style={styles.drawerButton}
          activeOpacity={0.6}
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}>
          <Image
            source={require('../../assets/images/DrawerIcon.webp')}
            style={{...styles.drawerButtonImage, tintColor: '#adacac'}}
          />
        </TouchableOpacity>
      </Left>
      <Body style={{marginLeft: '20%'}}>
        <Title style={styles.title}>{title}</Title>
      </Body>
    </Header>
  );
};
const styles = StyleSheet.create({
  drawerButton: {
    height: 20,
    // display: 'flex',
    // flex: 1,
    // resizeMode: 'contain',
    width: 30,
    // paddingLeft: 20,
    // display: 'flex',
    // flex: 1
    // flex: 1
  },
  drawerButtonImage: {
    height: 20,
    // paddingEnd: 15,
    flex: 1,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Dosis-SemiBold',
    color: '#333',
    fontSize: 20,
  },
});
