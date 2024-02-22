import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { colors, defaultStyle } from '../styles/styles';
import * as imagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';

export default function CamerView({ navigation, route }) {
  const [hasPermission, setHasPermisson] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameras, setCamera] = useState(null);

  const { product } = useSelector((state) => state.products);
  console.log('cameravire==', product);
  const openImagePicker = async () => {
    const permissionResult = await imagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) return alert('Permisson to access gallery is required');
    const data = await imagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (route.params?.newProduct) {
      navigation.navigate('newproduct', {
        image: data.assets[0].uri,
      });
    }
    if (route.params?.updateProduct) {
      navigation.navigate('productimages', {
        image: data.assets[0].uri,
      });
    }
    if (route.params?.updateProfile) {
      navigation.navigate('profile', {
        image: data.assets[0].uri,
      });
    }
    if (route.params?.signup) {
      navigation.navigate('signup', {
        image: data.assets[0].uri,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermisson(status === 'granted');
    })();
  }, []);
  const clickPicture = async () => {
    const data = await cameras.takePictureAsync();
    if (route.params?.newProduct) {
      navigation.navigate('newproduct', {
        image: data.uri,
      });
    }
    if (route.params?.updateProduct) {
      navigation.navigate('productimages', {
        image: data.uri,
      });
    }
    if (route.params?.updateProfile) {
      navigation.navigate('profile', {
        image: data.uri,
      });
    }
    if (route.params?.signup) {
      navigation.navigate('signup', {
        image: data.uri,
      });
    }
  };
  if (hasPermission === null) return <View></View>;
  if (hasPermission === false)
    return (
      <View style={defaultStyle}>
        <Text>No Access to Camera</Text>
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Camera
        type={type}
        style={{
          flex: 1,
          aspectRatio: 1,
        }}
        ratio="1:1"
        ref={(e) => setCamera(e)}
      />
      <View
        style={{
          flexDirection: 'row',
          bottom: 10,
          width: '100%',
          justifyContent: 'space-evenly',
          position: 'absolute',
        }}
      >
        <MyIcon icon={'image'} handler={openImagePicker} />
        <MyIcon icon={'camera'} handler={clickPicture} />
        <MyIcon
          icon={'camera-flip'}
          handler={() => {
            setType((prev) => (prev === CameraType.back ? CameraType.front : CameraType.back));
          }}
        />
      </View>
    </View>
  );
}

const MyIcon = ({ icon, handler }) => {
  return (
    <TouchableOpacity onPress={handler}>
      <Avatar.Icon
        icon={icon}
        size={40}
        style={{
          backgroundColor: colors.color1,
        }}
        color={colors.color2}
      />
    </TouchableOpacity>
  );
};
