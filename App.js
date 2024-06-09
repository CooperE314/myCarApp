import { Camera, CameraType } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, State } from 'react-native';
import {GestureHandlerRootView , PanGestureHandler} from 'react-native-gesture-handler';
import {Animated} from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);


  if (!permission) {
        // Camera permissions are still loading

    return <View />;
  }
  
  if (!permission.granted) {
        // Camera permissions are not granted yet

    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  function toggleCameraType() {
      //flip camera function

    setType((current) => (
      current === CameraType.back ? CameraType.front : CameraType.back
    ));
  }
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      console.log(photo);
    }
  };

  return(
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CameraScreen">
        {props => (
          <GestureHandlerRootView style={styles.container}>          
              <PanGestureHandler
                onGestureEvent={({ nativeEvent }) => { 
                  if (nativeEvent.translationX < -50) {
                    props.navigation.navigate('HistoryScreen');
                  }
                }}
              >
                <Camera
                  style={styles.camera}
                  type={type}
                  ref={cameraRef}
                >
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={takePicture}
                    >
                      <Text style={styles.text}>Take Picture</Text>
                    </TouchableOpacity>
                  </View>
                </Camera>
              </PanGestureHandler>
          </GestureHandlerRootView>
        )}
      </Stack.Screen>
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="PictureScreen" component={PictureScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
}
const HistoryScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}></View>
  );

}
const PictureScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}></View>
  );
}
const CameraScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}></View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  photo: {
    flex: 1,
    resizeMode: 'contain',
  },
});
