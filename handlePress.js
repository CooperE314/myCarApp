<<<<<<< HEAD
import { useRef, useEffect } from 'react';

const useCamera = () => {
  const videoRef = useRef(null);
=======
import React, { useEffect } from 'react';
import { Camera } from 'expo-camera';
import { View, Text } from 'react-native';
>>>>>>> 006ec6ef96d1a6ca3a0e6ed74d5d4eff2471a510

const CameraApp = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access camera was denied');
      }
<<<<<<< HEAD
    };

    openCamera();

    // Cleanup function to stop the camera stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  return videoRef;
};

export default useCamera;
=======
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} />
    </View>
  );
};

export default CameraApp;
>>>>>>> 006ec6ef96d1a6ca3a0e6ed74d5d4eff2471a510
