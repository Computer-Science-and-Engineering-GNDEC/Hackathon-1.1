import React, {useEffect, useRef, useState} from 'react';
import {AppState, Dimensions, Platform, ScaledSize} from 'react-native';
import {useBluetoothStatus} from 'react-native-bluetooth-status';

interface Props {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  window?: ScaledSize;
  screen?: ScaledSize;
}

export const useCheating = ({
  count,
  setCount,
  window: originalWindow,
  screen: originalScreen,
}: Props) => {
  const [watch, setWatch] = useState({
    watching: true,
    variant: '',
    detail: '',
    cheating: false,
  });

  const appState = useRef(AppState.currentState);

  console.log('line 27', AppState.currentState);

  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [btStatus, isPending, setBluetooth] = useBluetoothStatus();

  /* Check whether user changes window size */
  const onDimentionsChanged = ({
    window,
    screen,
  }: {
    window: ScaledSize;
    screen: ScaledSize;
  }) => {
    if (window !== originalScreen || screen !== originalScreen) {
      setWatch({
        watching: false,
        variant: count >= 3 ? 'exit' : 'warning',
        detail: 'Bluetooth was turned on!',
        cheating: true,
      });
      setCount((c) => c + 1);
    }
  };

  /* when the user pulls down the notification drawer */
  const _handleBlurEvent = (a_state: any) => {
    console.log('on blur', appState.current);

    console.log('blur state', a_state);
  };

  /* Check whether App is in background */
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    if (Platform.OS === 'android') {
      console.log('platform is android');
      AppState.addEventListener('blur', _handleBlurEvent);
    }

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);

      if (Platform.OS === 'android') {
        console.log('platform is android');

        AppState.removeEventListener('blur', _handleBlurEvent);
      }
    };
  }, []);

  /* check bluetooth active or not */
  useEffect(() => {
    if (!isPending && btStatus) {
      setWatch({
        watching: false,
        variant: count >= 3 ? 'exit' : 'warning',
        detail: 'Bluetooth was turned on!',
        cheating: true,
      });
      setCount((c) => c + 1);
      console.log(`btstatus: ${btStatus}`);
    }
  }, [btStatus]);

  /* If user tries to change size of window */
  useEffect(() => {
    Dimensions.addEventListener('change', onDimentionsChanged);
    return () => {
      Dimensions.removeEventListener('change', onDimentionsChanged);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: any) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);

    if (appState.current === 'background') {
      setWatch({
        watching: false,
        variant: count >= 3 ? 'exit' : 'warning',
        detail: 'You minimized the window',
        cheating: true,
      });
      setCount((c) => c + 1);
    }
  };

  const detail = {variant: watch.variant, detail: watch.detail};
  const startWatch = () => setWatch((w) => ({...w, watching: true}));
  return [detail.variant, detail, startWatch];
};
