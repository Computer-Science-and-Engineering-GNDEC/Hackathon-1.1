import React from 'react';
import {AppRegistry, Image, StatusBar, StyleSheet, View} from 'react-native';
import {Container, Content, Text, List, ListItem} from 'native-base';

export const SideBar = ({navigation}: any) => {
  return (
    <Container>
      <Content>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <List>
          <ListItem style={styles.listItem}>
            <Text style={styles.text}>Home</Text>
          </ListItem>
          <ListItem style={styles.listItem}>
            <Text style={styles.text}>Upcoming Tests</Text>
          </ListItem>
          <ListItem style={styles.listItem}>
            <Text style={styles.text}>Contact Us</Text>
          </ListItem>
        </List>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Instagram </Text>
          <Text style={styles.footerText}>Facebook </Text>
          <Text style={styles.footerText}>Twitter </Text>
          <Text style={styles.footerText}>Youtube </Text>
          <Text style={styles.footerText}>LinkedIn </Text>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  logo: {
    // height: '30%',
    height: 130,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    maxWidth: 250,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'Dosis-SemiBold',
    color: '#333',
    fontSize: 14,
  },
  listItem: {},
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '10%',
    marginRight: '10%',
    flexWrap: 'wrap',
  },
  footerText: {
    fontFamily: 'Dosis-SemiBold',
    color: '#333',
    fontSize: 14,
    paddingRight: 5,
    paddingBottom: 5,
  },
});
