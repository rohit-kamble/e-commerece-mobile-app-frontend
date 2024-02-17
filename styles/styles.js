import { StyleSheet, Platform, StatusBar } from 'react-native';

export const colors = {
  color1: '#c70049',
  color1_light: 'rgba(277,25, 99, 1)',
  color1_light2: 'rgba(199, 0, 73, 0.8)',
  color2: 'white',
  colors3: 'rgb(45,45,45)',
  colors4: 'transparent',
  colors5: '#f2f2f2',
  colors6: '#f7f7f7',
};

export const defaultStyle = StyleSheet.create({
  padding: 24,
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  flex: 1,
  backgroundColor: colors.color2,
});

export const inputStyling = StyleSheet.create({
  height: 50,
  backgroundColor: colors.color2,
  marginVertical: 10,
});
