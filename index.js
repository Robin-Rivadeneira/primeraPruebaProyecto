import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

// Ignorar warnings específicos
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'AsyncStorage has been extracted from react-native core',
]);

import App from './App';

// Registra la aplicación como componente raíz
registerRootComponent(App);