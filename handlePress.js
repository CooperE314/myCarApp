
import React, { useEffect } from 'react';
import { Camera } from 'expo-camera';
import { View, Text } from 'react-native';

const CameraApp = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access camera was denied');
      }

    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} />
    </View>
  );
};

export default CameraApp;


