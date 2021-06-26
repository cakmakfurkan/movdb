import {createAppContainer} from 'react-navigation';
import {createSwitchNavigator} from 'react-navigation';
import MainScreen from './screens/MainScreen';

const AppNavigator = createSwitchNavigator(
  {
    Main: MainScreen,
  },
  {
    initialRouteName: 'Main',
  },
);

export default createAppContainer(AppNavigator);
