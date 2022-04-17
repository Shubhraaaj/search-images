import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import ImageDetails from './components/ImageDetails/ImageDetails';
import ImageList from './components/ImageList/ImageList';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';

/**
 * Infinite scrolling 
 * Redux State 
 * Android device - 1
 * Screen rotate - 1
 * UI Designing - 4
 */

const Stack = createNativeStackNavigator();
const store = configureStore();

export default function App() {
  return (
    <Provider store = { store }>
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen 
                name="Home"
                component={ImageList}
                options={{title: 'Pixabay'}}
                />
              <Stack.Screen 
                name="Details"
                component={ImageDetails}
                options={{title: 'Image Details'}}
                />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
