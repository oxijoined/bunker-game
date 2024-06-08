'use client'

import React, { useState } from 'react';
import { Button, Box } from "@chakra-ui/react";
import axios from 'axios';
import ColorPicker from './ColorPicker';

const controlLamp = async (actions: any) => {
  try {
    await axios.post('/api/lamp', { actions });
  } catch (err) {
    console.error('An error occurred:', err);
  }
};

export const rgbOn = async () => {
  console.log("Turning on the lamp");
  const actions = [{
    type: "devices.capabilities.on_off",
    state: {
      instance: "on",
      value: true
    }
  }];
  await controlLamp(actions);
};

export const rgbOff = async () => {
  console.log("Turning off the lamp");
  const actions = [{
    type: "devices.capabilities.on_off",
    state: {
      instance: "on",
      value: false
    }
  }];
  await controlLamp(actions);
};

export const setLightColorAndOn = async (color: { h: number; s: number; v: number }) => {
  console.log(`Setting light color to HSV(${color.h}, ${color.s}, ${color.v})`);
  const actions = [
    {
      type: "devices.capabilities.color_setting",
      state: {
        instance: "hsv",
        value: {
          h: Math.round(color.h),
          s: Math.round(color.s),
          v: Math.round(color.v)
        }
      }
    },
    {
      type: "devices.capabilities.on_off",
      state: {
        instance: "on",
        value: true
      }
    }
  ];
  await controlLamp(actions);
};

const LampControls: React.FC = () => {
  const [color, setColor] = useState({ h: 0, s: 0, v: 100 });
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(true);

  const handleColorChange = (color: { h: number; s: number; v: number }) => {
    setColor(color);
    setLightColorAndOn(color);
  };

  const toggleColorPicker = () => {
    setIsColorPickerVisible(!isColorPickerVisible);
  };

  return (
    <Box position="absolute" top={4} right={4}>
      <Button colorScheme="yellow" onClick={rgbOn} m={2}>Turn On</Button>
      <Button colorScheme="yellow" onClick={rgbOff} m={2}>Turn Off</Button>
      <Button colorScheme="blue" onClick={toggleColorPicker} m={2}>
        {isColorPickerVisible ? 'Hide Color Picker' : 'Show Color Picker'}
      </Button>
      {isColorPickerVisible && <ColorPicker onColorChange={handleColorChange} />}
    </Box>
  );
};

export default LampControls;
