import React, {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

export const useCheating = (INITIAL_WATCHING_STATE: boolean) => {
  const [watch, setWatch] = useState({
    watching: INITIAL_WATCHING_STATE,
    variant: '',
    detail: '',
    cheating: false,
  });

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
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

    if (appState.current === 'background')
      setWatch({
        watching: false,
        variant: 'warning',
        detail: 'You minimized the window',
        cheating: false,
      });
  };

  return [appStateVisible, ''];
};
