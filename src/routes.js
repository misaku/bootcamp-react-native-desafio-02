import { createStackNavigator, createAppContainer } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Gitissues from './pages/Gitissues';
import DetailPage from './pages/Detail';

const BarHeight = getStatusBarHeight();

const AppNavigator = createStackNavigator({
  Home: {
    screen: Gitissues,
    navigationOptions: {
      title: 'Gitissues',
    },
  },
  Detail: {
    screen: DetailPage,
    navigationOptions: (item) => {
      const detalhe = item.navigation.getParam('detail').title;
      return {
        title: detalhe,
        headerTitleStyle: {
          textAlign: 'left',
        },
      };
    },

  },
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      marginTop: BarHeight,
    },
    headerTitleStyle: {
      fontSize: 20,
      alignSelf: 'center',
      textAlign: 'center',
      flex: 1,
    },
  },
});
export default createAppContainer(AppNavigator);
