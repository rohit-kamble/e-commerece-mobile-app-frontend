import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/action/userAction.js';
import Toast from 'react-native-toast-message';
import { useMessageAndErrorFromUser } from '../utils/customHook.js';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const dispatch = useDispatch();
  const { loading } = useMessageAndErrorFromUser(navigation, 'profile', dispatch);
  const submitHandler = () => {
    console.log('call');
    dispatch(login(email, password));
  };

  return (
    <>
      <View style={defaultStyle}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Login</Text>
        </View>
        <View style={styles.container}>
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
            secureTextEntry={true}
            placeholder="password"
            value={password}
            onChangeText={setPassWord}
            style={inputStyling}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('forgotpassword')}
          >
            <Text style={styles.forget}>Forgot password</Text>
          </TouchableOpacity>
          <Button
            textColor={colors.color2}
            disabled={email === '' || password === ''}
            style={styles.btn}
            onPress={submitHandler}
            loading={loading}
          >
            Log In
          </Button>
          <Text style={styles.or}>OR</Text>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer activeRoute="profile" />
    </>
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
    textAlign: 'right',
    fontWeight: '100',
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 6,
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
