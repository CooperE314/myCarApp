import { Camera } from 'expo-camera';
import React, { useRef, useState, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, State } from 'react-native';
import {GestureHandlerRootView , PanGestureHandler} from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';



const Stack = createStackNavigator();

export default function App() {
  
  return(
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="PictureScreen" component={PictureScreen} />
    </Stack.Navigator>
  </NavigationContainer>
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
  PictureButton: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    bottom: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: '70%', 
    height: '70%', 
    resizeMode: 'contain',
    transform: [{ scale: 0.9 }],
    borderWidth: 5,
    borderColor: 'black',
  },
  photo: {
    flex: 1,
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 50,
  },
  PictureScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  PictureScreenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    bottom: 190,
  }
});
const HistoryScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}></View>
  );

}
const PictureScreen = ({ route }) => {
  const { photoUri } = route.params;
  const [carModel, setCarModel] = useState(null);

  useEffect(() => {
    const analyzeImage = async () => {
      try {
        const formData = new FormData();
        formData.append('image', {
          uri: photoUri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const response = await axios.post('http://100.110.192.66:3000/analyze', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('API response:', response); // Log the entire response object

        setCarModel(response.data.carModel);
      } catch (error) {
        console.error('Error analyzing image:', error);
        setCarModel('Error analyzing image');
      }
    };

    analyzeImage();
  }, []);

  return (
    <View style={styles.PictureScreenContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: photoUri }} style={styles.image} />
      </View>
      <Text style={styles.PictureScreenText}>COOL PICTURE</Text>
      {carModel && <Text style={styles.PictureScreenText}>Car Model: {carModel}</Text>}
    </View>
  );
};
const CameraScreen = (props) => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
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
  
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      props.navigation.navigate('PictureScreen', { photoUri: photo.uri });

    }
  };

  return (
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
          autoFocus={Camera.Constants.AutoFocus.on}

          >
            <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.PictureButton}
              onPress={() => {
                takePicture(); 
              }}
              >
                <Image source={require('./assets/camera2.png')} style={{ width: 90, height: 90 }} />
              </TouchableOpacity>
            </View>
        </Camera>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};
