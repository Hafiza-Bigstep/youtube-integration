import React, { createContext, useContext, useState, useEffect } from 'react';
// import axiosInstance from '@/services/api';

// Utility function to determine if a color is light or dark
const getLuminance = (hex: string) => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance;
};

const isLightColor = (color: string) => getLuminance(color) > 0.5;
const isDarkColor = (color: string) => getLuminance(color) <= 0.5;

export type ColorContextType = {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttontextColor: string;
  sketchPickerColor: string;
  sketchPickerLightColor: string;
  flag: number;
  isLightColor: boolean;
  isDarkColor: boolean;
};

export const ColorContext = createContext<ColorContextType>({
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  buttonColor: '#652dbf',
  buttontextColor: '#FFFFFF',
  sketchPickerColor: '#FFFFFF',
  sketchPickerLightColor: '',
  flag: 1,
  isLightColor: true,
  isDarkColor: false,
});

export const ColorProvider = ({ children }: any) => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');
  const [buttonColor, setButtonColor] = useState('#652dbf');
  const [buttontextColor, setbuttontextColor] = useState('#FFFFFF');
  const [sketchPickerColor, setSketchPickerColor] = useState('#FFFFFF');
  const [flag, setFlag] = useState(1); // 0 for sketchPicker, 1 for backgroundColor
  const [sketchPickerLightColor, setSketchPickerLightColor] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found in sessionStorage');
        }
        // const response = await axiosInstance.get(`/CustomizeProfile/${userId}`);
        // const customizeThemeData = response.data;
        // if (customizeThemeData) {
        //   const backgroundColor = customizeThemeData.backgroundColor || '#FFFFFF';
        //   setBackgroundColor(backgroundColor);
        //   setTextColor(customizeThemeData.textColor || '#000000');
        //   setButtonColor(customizeThemeData.buttonColor || '#652DBF');
        //   setbuttontextColor(customizeThemeData.buttontextColor || '#FFFFFF');
        //   setSketchPickerColor(
        //     customizeThemeData.sketchPickerColor || '#FFFFFF'
        //   );

        //   setSketchPickerLightColor(
        //     customizeThemeData.sketchPickerLightColor || ''
        //   );

        //   setFlag(customizeThemeData.flag || 1);
        // } else {
        //   // Set default colors if data is null
        //   resetColors();
        // }
      } catch (error: any) {
        console.error('Error fetching colors:', error.message);
        // Set default colors if there's an error
        resetColors();
      }
    };
    fetchData();
  }, []);

  const resetColors = () => {
    setBackgroundColor('#FFFFFF');
    setTextColor('#000000');
    setButtonColor('#652DBF');
    setbuttontextColor('#FFFFFF');
    setSketchPickerColor('#FFFFFF');
    setSketchPickerLightColor('');
    setFlag(1);
  };

  const contextValue = {
    backgroundColor,
    textColor,
    buttonColor,
    buttontextColor,
    sketchPickerColor,
    sketchPickerLightColor,
    updateBackgroundColor: setBackgroundColor,
    updateTextColor: setTextColor,
    updateButtonColor: setButtonColor,
    updateButtonTextColor: setbuttontextColor,
    updateSketchPickerColor: setSketchPickerColor,
    updateSketchPickerLightColor: setSketchPickerLightColor,
    flag,
    setFlag,
    isLightColor: isLightColor(backgroundColor),
    isDarkColor: isDarkColor(backgroundColor),
  };

  return (
    <ColorContext.Provider value={contextValue}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => useContext(ColorContext);
