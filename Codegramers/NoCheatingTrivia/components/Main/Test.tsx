import React, {useEffect, useRef, useState} from 'react';
import {Spinner, ListItem, Left, Body} from 'native-base';
import {Image, StyleSheet, View, Text} from 'react-native';
import axios from 'axios';
import {List} from 'native-base';
import {Thumbnail} from 'native-base';
import WebView from 'react-native-webview';
// import {} from 'rea'

export default function Test(/* { songs, loading, error }: Props */) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: false,
  });

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // useEffect(() => {
  //   if (isMounted.current)
  //     axios
  //       .get(
  //         'http://192.168.0.102:5000/v1/exams/604b09f473cf0352c4e7c464/teacher/604af5c278158c34b81c0202',
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //         setState({
  //           data: res.data,
  //           loading: false,
  //           error: false,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log('error encountered:', err);
  //         if (isMounted.current)
  //           setState({
  //             data: null,
  //             loading: false,
  //             error: true,
  //           });
  //       });
  // }, []);

  return (
    <>
      {state.loading ? (
        <View style={styles.spinnerContainer}>
          <Spinner color="blue" />
        </View>
      ) : state.error ? (
        <View>
          <Text>Something went wrong...please try again later</Text>
        </View>
      ) : (
        <WebView
          source={{
            uri: 'http://no-cheating-trivia.netlify.app/',
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    paddingTop: '40%',
  },
});
