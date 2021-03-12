/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Main from './components/Main/Main';
import {SideBar} from './components/SideBar/SideBar';
import {SplashScreen} from './components/SplashScreen/SplashScreen';
import {checkAuth} from './helpers.cheackAuth';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
          {/* Here is where we are combining Stack Navigator to Drawer Navigator */}
          <Drawer.Screen name="App" component={App} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  const [checking, setChecking] = useState({loading: true, auth: false});

  useEffect(() => {
    // const f = async () => await AsyncStorage.removeItem('radioTangyToken');
    // f();

    let t;
    const g = async () => {
      t = await checkAuth();
      console.log('whether user authenticated:', t);
      if (t) setChecking({auth: true, loading: false});
      else setChecking({auth: false, loading: false});
    };
    g();
  }, []);
  return (
    <>
      {!checking.loading ? (
        <Stack.Navigator
        // headerMode='screen'
        // screenOptions={{
        //   headerRight: ({ navigation }: any) => <Text>Hello</Text>,
        // }}
        >
          {checking.auth ? (
            // User Is Signed In
            <>
              <Stack.Screen
                name="Main"
                component={Main}
                options={{
                  headerShown: false,
                }}
              />
              {/* <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  headerShown: false,
                }}
              /> */}
            </>
          ) : (
            // User Is Not Signed In
            <>
              {/* <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="LoginRegister"
                component={LoginRegsiter}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />  */}
              <Text>Not signed in!!!</Text>
            </>
          )}
        </Stack.Navigator>
      ) : (
        <SplashScreen />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default DrawerNavigation;
