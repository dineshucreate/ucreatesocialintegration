/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class App extends Component {
  componentWillMount() {
    GoogleSignin.configure({
      iosClientId: '700137076210-sd8tvj8bku7r1vdkanu1426v3dbhfptv.apps.googleusercontent.com'
    })
  } 
  
  componentWillUnmount() {
    // this._clickListener && this._clickListener.remove();
    if(Platform.OS === "ios"){

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.handleSigninGoogle()}>
          <Text style ={styles.textButtonStyle}>Sign in with Google +</Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleSigninGoogle() {
    GoogleSignin.signIn().then((user) => {
      console.log(user);
      alert(user.name);
    }).catch((err) => {
      console.log('WRONG SIGNIN', err);
    }).done();
  }

  currentUserAsync() {
    return new Promise((resolve, reject) => {
      const sucessCb = NativeAppEventEmitter.addListener('RNGoogleSignInSuccess', (user) => {
        this._user = {
          ...user,
        };
        this._removeListeners(sucessCb, errorCb);
        resolve(user);
      });

      const errorCb = NativeAppEventEmitter.addListener('RNGoogleSignInError', () => {
        this._removeListeners(sucessCb, errorCb);
        resolve(null);
      });

      RNGoogleSignin.currentUserAsync();
    });
  }

  currentUser() {
    return {...this._user};
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonStyle: {
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F00',
    borderRadius: 5
  },
  textButtonStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF'
  }
});
