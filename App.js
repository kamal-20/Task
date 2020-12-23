import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { Provider as AuthProvider } from './src/context/AuthContext';
//importing screens
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import authScreen from './src/screens/authScreen';
//root nav
import { setNavigator } from './src/hooks/navigatorRef';

const switchNavigator = createSwitchNavigator({
  authScreen: authScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  Feedback: FeedbackScreen,
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
    </AuthProvider>
  );
};
