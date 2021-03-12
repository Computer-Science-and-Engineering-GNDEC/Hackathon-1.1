declare module 'native-base' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export class DefaultTabBar extends React.Component<any, any> {}
}

import React, {useEffect, useState} from 'react';
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  DefaultTabBar,
  Body,
  Title,
  Left,
  Button,
} from 'native-base';

// import {BackButton} from './BackButton';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
// import LatestSongs from './LatestSongs';
import axios from 'axios';
import {MainHeader} from './Mainheader';
import Test from '../Main/Test';
// import FitImage from 'react-native-fit-image';
// import {MainHeader} from './MainHeader';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderTabBar = (props: any) => {
  props.tabStyle = Object.create(props.tabStyle);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <DefaultTabBar {...props} />;
};

export const TabsWrapper = ({navigation, count}: any) => {
  // console.log('navigation in Tabs Wrapper', navigation);
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: false,
  });

  return (
    <>
      <Container>
        <MainHeader title="Home" navigation={navigation} />
        <Tabs
          renderTabBar={renderTabBar}
          tabBarBackgroundColor="#fff"
          tabBarActiveTextColor="#000"
          tabBarInactiveTextColor="#000"
          tabBarUnderlineStyle={{
            borderBottomColor: 'blue',
            borderBottomWidth: 3,
            marginLeft: 20,
            width: '40%',
          }}>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: '#fff'}}>
                <Text style={{color: '#000'}}>Active</Text>
              </TabHeading>
            }>
            <Test />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: '#fff'}}>
                <Text style={{color: '#000'}}>Calculator</Text>
              </TabHeading>
            }>
            <Text>Featured Section</Text>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  drawerButton: {
    height: 30,
    // display: 'flex',
    // flex: 1,
    // resizeMode: 'contain',
    width: 30,
    // paddingLeft: 20,
  },
  drawerButtonImage: {
    // height: 30,
    // paddingEnd: 15,
  },
});
