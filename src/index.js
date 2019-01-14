import React, { Component } from 'react';
import './config/ReactotronConfig';
import './config/DevToolsConfig';
import { StatusBar } from 'react-native';
import { useScreens } from 'react-native-screens';
import { colors } from '~/styles';
import Routes from './routes';

useScreens();
export default class App extends Component {
  componentDidMount() {
    StatusBar.setBackgroundColor(colors.darkTransparent);
    StatusBar.setBarStyle('light-content');
    StatusBar.setTranslucent(true);
  }

  render() {
    return <Routes />;
  }
}
