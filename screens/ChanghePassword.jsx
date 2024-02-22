import { Text, View, StyleSheet } from 'react-native';
import { colors, defaultStyle, inputStyling } from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../redux/action/otherAction';
import { useMessageAndErrorFromOther } from '../utils/customHook';

export default function ChanghePassword({ navigation }) {
  const [oldPassword, setOldPassWord] = useState('');
  const [newPassword, setNewPassWord] = useState('');
  // const loading = true;
  const dispatch = useDispatch();
  const { loading } = useMessageAndErrorFromOther(dispatch, navigation, 'profile', fun);

  const submitHandler = () => {
    dispatch(updatePassword(oldPassword, newPassword));
    setOldPassWord('');
    setNewPassWord('');
  };
  return (
    <>
      <View style={defaultStyle}>
        <Header isBack={true} />
        <View style={{ marginBottom: 20, paddingTop: 70 }}>
          <Text style={styles.heading}>Change Passowrd</Text>
        </View>
        <View style={styles.container}>
          <TextInput
            mode="outlined"
            activeOutlineColor={colors.color1}
            placeholder="old password"
            value={oldPassword}
            onChangeText={setOldPassWord}
            style={inputStyling}
          />
          <TextInput
            mode="outlined"
            activeOutlineColor={colors.color1}
            secureTextEntry={true}
            placeholder="new password"
            value={newPassword}
            onChangeText={setNewPassWord}
            style={inputStyling}
          />
          <Button
            textColor={colors.color2}
            disabled={oldPassword === '' || newPassword === ''}
            style={styles.btn}
            onPress={submitHandler}
            loading={loading}
          >
            Change Password
          </Button>
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
