import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import ImagePickerScreen from './ImagePickerScreen';
import AuthScreen from './Auth';

const AppNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    ImagePicker: ImagePickerScreen,
  },
  {
    initialRouteName: 'Auth'
  }
);

export default createAppContainer(AppNavigator);