import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';


function handlePress() {
  console.log('Button pressed!');

  /*return (
    <RNCamera
      style={{ flex: 1 }}
      type={RNCamera.Constants.Type.back}
      captureAudio={false}
      autoFocus={RNCamera.Constants.AutoFocus.on}
      onGoogleVisionBarcodesDetected={({ barcodes }) => {
        console.log(barcodes);
      }}
    />
  );
  */
}

export default handlePress;