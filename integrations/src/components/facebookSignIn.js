import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableOpacity
} from 'react-native';

import FBSDK, { LoginManager,AccessToken,GraphRequest,GraphRequestManager } from 'react-native-fbsdk'

export default class facebookSignIn extends Component {

  _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(function (result) {
      if (result.isCancelled) {
        alert('Cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then((data)=>{
                    const infoRequest = new GraphRequest(
                      '/me?fields=name,picture',
                      null,
                      this._responseInfoCallback
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();
                  })
      }
    }, function (error) {
      alert('Error')
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._fbAuth()}>
          <Text>Login Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

 //Create response callback.
  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Result Name: ' + result.name);
    }
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});