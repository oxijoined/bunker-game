import React, { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

interface ColorPickerProps {
  onColorChange: (color: { h: number; s: number; v: number }) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
  const [color, setColor] = useState<{ h: number; s: number; v: number }>({ h: 0, s: 0, v: 100 });

  const handleChangeComplete = (colorResult: ColorResult) => {
    const { h, s, v } = colorResult.hsv;
    const scaledColor = {
      h,
      s: s * 100,
      v: v * 100,
    };
    setColor(scaledColor);
    onColorChange(scaledColor);
  };

  return (
    <SketchPicker
      color={color}
      onChangeComplete={handleChangeComplete}
    />
  );
};

export default ColorPicker;
