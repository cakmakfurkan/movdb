import {createAppContainer} from 'react-navigation';
import {createSwitchNavigator} from 'react-navigation';
import MainScreen from './screens/MainScreen';
import DetailScreen from './components/MovieDetail';
import FavScreen from './screens/FavScreen';
const AppNavigator = createSwitchNavigator(
  {
    Main: MainScreen,
    Detail: DetailScreen,
    Fav: FavScreen,
  },
  {
    initialRouteName: 'Main',
  },
);

export default createAppContainer(AppNavigator);
