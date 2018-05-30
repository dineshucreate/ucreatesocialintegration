import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
// import App from './App';
import App from './src/components/facebookSignIn.js'

class integrations extends Component {
   render() {
      return (
         <View>
            <facebookSignIn />
         </View>
      );
   }
}
export default App

AppRegistry.registerComponent('integrations', () => App);
