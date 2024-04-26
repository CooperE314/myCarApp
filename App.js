import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
//import { RNCamera } from 'react-native-camera';


import handlePress from './handlePress';

function App(){
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>The Car App</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
        <Image 
        source={require('./pics/camera2.png')}
        style = {styles.buttonImage}
        />
      </TouchableOpacity>
    </View>
  );
  
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 150,
  },
  appTitle: {
    fontSize: 36,
    color: 'white',
    marginBottom: 150,
  },
  buttonContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  buttonImage: {
    width: 100, 
    height: 100,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});