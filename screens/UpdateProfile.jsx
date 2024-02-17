import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { useMessageAndErrorFromOther } from '../utils/customHook.js';
import { updateProfile } from '../redux/action/otherAction';

export default function UpdateProfile({ navigation }) {
  const { user } = useSelector((state) => state.user);
  console.log('user==', user?.pinCode);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [country, setCountry] = useState(user?.country);
  const [pinCode, setPinCode] = useState(user?.pinCode.toString());
  //   const loading = true;

  const dispatch = useDispatch();
  const { loading } = useMessageAndErrorFromOther({ dispatch, navigation, navigateTo: 'profile' });
  const submitHandler = () => {
    dispatch(updateProfile({ name, email, address, city, country, pinCode }));
  };
  const disabledBtn = !name || !email || !address || !city || !country || !pinCode;

  return (
    <View style={defaultStyle}>
      <Header isBack={true} />
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.heading}>Edit Profile</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{
          padding: 20,
          elevation: 10,
          borderRadius: 10,
          backgroundColor: colors.colors3,
        }}
      >
        <View style={styles.container}>
          {/* <Avatar.Image 
                style={{ 
                    alignSelf: 'center',
                    backgroundColor: colors.color1}}
                size={80}
                source={{
                    uri: avatar? avatar : defaultimg
                }}
            />
            <TouchableOpacity onPress={()=> navigation.navigate('camera')}>
                <Button
                    textColor={colors.color2}
                >
                    Change Photo
                </Button>
            </TouchableOpacity> */}
          <TextInput
            mode="outlined"
            activeOutlineColor={colors.color1}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={inputStyling}
          />
          <TextInput
            mode="outlined"
            activeOutlineColor={colors.color1}
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            style={inputStyling}
          />
          <TextInput
            mode="outlined"
            activeOutlineColor={colors.color1}
            placeholder="address"
            value={address}
            onChangeText={setAddress}
            style={inputStyling}
          />
          <TextInput
            mode="outlined"
            activeOutlineColor={colors.color1}
            placeholder="City"
            value={city}
            onChangeText={setCity}
            style={inputStyling}
          />
          <TextInput
            mode="outlined"
            activeOutlineColor={colors.color1}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
            style={inputStyling}
          />
          <TextInput
            mode="outlined"
            activeOutlineColor={colors.color1}
            placeholder="PinCode"
            value={'421501'}
            onChangeText={setPinCode}
            style={inputStyling}
            keyboardType="number-pad"
          />
          <Button
            textColor={colors.color2}
            disabled={disabledBtn}
            style={styles.btn}
            onPress={submitHandler}
            loading={loading}
          >
            Update
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: colors.color1,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
    marginTop: 80,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.colors3,
    borderRadius: 10,
    justifyContent: 'center',
  },
  forget: {
    color: colors.color2,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'flex-end',
    fontWeight: '100',
    textAlign: 'right',
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 6,
    color: colors.color2,
  },
  or: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '100',
    color: colors.color2,
  },
  link: {
    alignSelf: 'center',
    color: colors.color2,
    fontSize: 18,
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
