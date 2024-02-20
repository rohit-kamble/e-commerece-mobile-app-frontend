import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, defaultStyle } from '../styles/styles';
import { Avatar, Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import ButtonBox from '../components/ButtonBox';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useMessageAndErrorFromOther, useMessageAndErrorFromUser } from '../utils/customHook.js';
import { loadUser, logout } from '../redux/action/userAction.js';
import { useIsFocused } from '@react-navigation/native';
import mime from 'mime';
import { updatePic } from '../redux/action/otherAction.js';
const defaultimg =
  'data:image/jpeg;base64,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';

export default function Profile({ navigation, route }) {
  const { user } = useSelector((state) => state.user);
  const isFoucs = useIsFocused();
  const [avatar, setAvatar] = useState(user ? user.avatar.url : defaultimg);
  const dispatch = useDispatch();
  const { loading } = useMessageAndErrorFromUser(navigation, 'login', dispatch);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const navigateHandlere = (text) => {
    switch (text) {
      case 'Admin':
        navigation.navigate('adminpannel');
        break;
      case 'Order':
        navigation.navigate('orders');
        break;
      case 'Profile':
        navigation.navigate('updateprofile');
        break;
      case 'Password':
        navigation.navigate('changepassword');
        break;
      // case 'SignOut':
      //   navigation.navigate('login');
      //   break;
      default:
        break;
    }
  };

  const { loadingPic } = useMessageAndErrorFromOther({ dispatch, fun: loadUser });
  useEffect(() => {
    if (route.params?.image) {
      setAvatar(route.params?.image);
      //dispatch update
      const myForm = new FormData();
      myForm.append({
        uri: route.params?.image,
        type: mime.getType(route.params?.image),
        name: route.params.image.split('/').pop(),
      });
      dispatch(updatePic());
    }
    dispatch(loadUser());
  }, [route.params, dispatch, isFoucs]);
  return (
    <>
      <View style={defaultStyle}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Sign Up</Text>
        </View>
        {user && user.name && loading ? (
          <Loader />
        ) : (
          <>
            <View style={styles.container}>
              <Avatar.Image
                size={100}
                source={{
                  uri: avatar ? avatar : defaultimg,
                }}
                style={{
                  backgroundColor: colors.colors3,
                }}
              />
              <TouchableOpacity
                disabled={loadingPic}
                onPress={() =>
                  navigation.navigate('camera', {
                    updateProfile: true,
                  })
                }
              >
                <Button disabled={loadingPic} loading={loadingPic} textColor={colors.color1}>
                  Change Photo
                </Button>
              </TouchableOpacity>

              <Text style={styles.name}>{user?.name}</Text>
              <Text style={[styles.name, { color: colors.color2 }]}>{user?.email}</Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 10,
                  justifyContent: 'space-between',
                }}
              >
                <ButtonBox
                  text={'Order'}
                  icon={'format-list-bulleted-square'}
                  handler={navigateHandlere}
                />
                {user?.role === 'admin' && (
                  <ButtonBox
                    text={'Admin'}
                    icon={'view-dashboard'}
                    reverse={true}
                    handler={navigateHandlere}
                  />
                )}

                <ButtonBox text={'Profile'} icon={'pencil'} handler={navigateHandlere} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 10,
                  justifyContent: 'space-evenly',
                }}
              >
                <ButtonBox text={'Password'} icon={'pencil'} handler={navigateHandlere} />
                <ButtonBox text={'logout'} icon={'exit-to-app'} handler={logoutHandler} />
              </View>
            </View>
          </>
        )}
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 7,
    backgroundColor: colors.colors3,
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: colors.color1,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
  },
  name: {
    fontWeight: '400',
    color: colors.color2,
    marginTop: 10,
    color: colors.color2,
  },
});
