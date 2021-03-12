import React, {useEffect, useRef, useState} from 'react';
import {AppState, Dimensions, ScaledSize} from 'react-native';
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

  /* Check whether App is in background */
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  /* check bluetooth active or not */
  useEffect(() => {
    if (!isPending) {
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
  return [appStateVisible, detail, startWatch];
};
