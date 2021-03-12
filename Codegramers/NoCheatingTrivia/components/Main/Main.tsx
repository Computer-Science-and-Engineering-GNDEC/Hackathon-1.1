import React, {useRef, useState} from 'react';
import {Alert, Dimensions, Text, View} from 'react-native';
import {useCheating} from '../../helpers/useCheating';
import {TabsWrapper} from '../Header/TabsWrapper';
// import {MainFooter} from './Footer/MainFooter';

export default function Main({navigation}: any) {
  /*
   * 0 -> Home
   * 1 -> Player
   * 2 -> Loved Songs
   * 3 -> Profile
   */
  const [counter, setCounter] = useState(0);
  const window = useRef(Dimensions.get('window'));
  const screen = useRef(Dimensions.get('screen'));

  const [cheatingCount, setCheatingCount] = useState(0);
  const [warning, reason, startWatch] = useCheating({
    count: cheatingCount,
    setCount: setCheatingCount,
    window: window.current,
    screen: screen.current,
  });

  //   const d: {
  //     variant: string;
  //     detail: string;
  // } = res

  // console.log(res);

  return (
    // Flex-1 to take all available height
    <>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {counter === 0 ? (
            <TabsWrapper count={cheatingCount} navigation={navigation} />
          ) : counter === 1 ? (
            <Text>Player</Text>
          ) : counter === 2 ? (
            <Text>Loved Songs</Text>
          ) : (
            // <Profile navigation={navigation} />
            <Text>lol</Text>
          )}
        </View>

        {/* <MainFooter
          navigation={navigation}
          counter={counter}
          setCounter={setCounter}
        /> */}

        {warning ? (
          Alert.alert(
            cheatingCount >= 3 ? 'Note' : 'Warning',
            `${reason.toString()}\nYou will be disqualified if this continues`,
            [
              {
                text: cheatingCount >= 3 ? 'OK' : 'Dismiss',
                onPress: () => (startWatch as any)(),
              },
            ],
          )
        ) : (
          <Text>"</Text>
        )}
      </View>
    </>
  );
}
