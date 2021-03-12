import React, {useState} from 'react';
import {Text, View} from 'react-native';
import { useCheating } from '../../helpers/useCheating';
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

  const [cheating, setCheating] = useCheating(false);
  return (
    // Flex-1 to take all available height
    <>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {counter === 0 ? (
            <TabsWrapper navigation={navigation} />
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
      </View>
    </>
  );
}
