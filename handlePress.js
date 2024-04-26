import React, { useEffect, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
/*
 ERROR  Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem., js engine: hermes
*/
const handlePress = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    openCamera();

    // Cleanup function to stop the camera stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h1>Camera App</h1>
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  );
};

export default handlePress;


