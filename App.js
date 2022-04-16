import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import ImageList from './components/ImageList/ImageList';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Shubhraj Prasad Singh</Text> */}
      <StatusBar style="auto" />
      {/* <Button title='Click here' /> */}
      <ImageList />
    </View>
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
