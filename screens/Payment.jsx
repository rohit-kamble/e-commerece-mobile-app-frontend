// import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import { Button, RadioButton } from 'react-native-paper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeHolder } from '../redux/action/otherAction';
import { useMessageAndErrorFromOther } from '../utils/customHook.js';
import { useStripe } from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { server } from '../redux/store';
import Loader from '../components/Loader';

export default function Payment({ navigation, route }) {
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loaderLoading, setLoaderLoading] = useState(false);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cartItem } = useSelector((state) => state.cart);
  //   const isAuthenticated = false;
  const redirectToLogin = () => {
    navigation.navigate('login');
  };
  const codHandler = (paymentInfo) => {
    const shippingInfo = {
      address: user?.address,
      city: user?.city,
      country: user?.country,
      pinCode: user?.pinCode,
    };
    const itemPrice = Number(route.params.itemPrice);
    const shippingPrice = Number(route.params.shippingPrice);
    const tax = Number(route.params.tax);
    const totalAmount = Number(route.params.totalAmount);
    dispatch(
      placeHolder(
        shippingInfo,
        (orderItems = cartItem),
        (itemsPrice = itemPrice),
        (texPrice = tax),
        (shippingCharges = shippingPrice),
        totalAmount,
        paymentInfo,
        paymentMethod
      )
    );
  };
  const onlineHandler = async () => {
    try {
      const {
        data: { client_secret },
      } = await axios.post(
        `${server}/order/payment`,
        {
          totalAmount: route.params.totalAmount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log('--', client_secret);
      const init = await stripe.initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        merchantDisplayName: 'merchant.com.rohitkamble',
        customFlow: true,
      });
      if (init.error) {
        return Toast.show({
          type: 'error',
          text1: init.error,
        });
      }
      const presentSheet = await stripe.presentPaymentSheet();
      console.log('****', presentSheet);
      setLoaderLoading(true);
      if (presentSheet.error) {
        // console.log('cancel in ', presentSheet, client_secret);
        setLoaderLoading(false);
        return Toast.show({
          type: 'error',
          text1: presentSheet.error.message,
        });
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(client_secret);
      console.log('payMentIntent====', paymentIntent);
      if (paymentIntent.status === 'Succeeded') {
        codHandler({ id: paymentIntent.id, status: paymentIntent.status });
      }
    } catch (error) {
      return Toast.show({
        type: 'error',
        text1: 'Some Error',
        text2: error,
      });
    }
  };

  const { loading } = useMessageAndErrorFromOther({
    dispatch,
    navigation,
    navigateTo: 'profile',
    fun: () => ({
      type: 'clearCart',
    }),
  });
  return loaderLoading ? (
    <Loader />
  ) : (
    <View style={defaultStyle}>
      <Header isBack={true} />
      <View style={{ paddingTop: 70 }}>
        <Text>Payment</Text>
        <Text style={{ fontWeight: 'bold' }}>Method</Text>
      </View>
      <View style={styles.container}>
        <RadioButton.Group value={paymentMethod} onValueChange={setPaymentMethod}>
          <View style={styles.radioStyle}>
            <Text style={styles.radioStyleText}>Cash on Delivery</Text>
            <RadioButton color={colors.color1} value={'COD'} />
          </View>
          <View style={styles.radioStyle}>
            <Text style={styles.radioStyleText}>online</Text>
            <RadioButton color={colors.color1} value={'ONLOINE'} />
          </View>
        </RadioButton.Group>
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={
          !isAuthenticated
            ? redirectToLogin
            : paymentMethod === 'COD'
              ? () => codHandler()
              : onlineHandler
        }
      >
        <Button
          style={styles.btn}
          loading={loading}
          disabled={loading}
          textColor={colors.color2}
          icon={paymentMethod === 'COD' ? 'check-circle' : 'circle-multiple-outline'}
        >
          {paymentMethod === 'COD' ? 'Place order' : 'Pay'}
        </Button>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.colors3,
    padding: 30,
    borderRadius: 10,
    marginVertical: 20,
    flex: 1,
    justifyContent: 'center',
  },
  radioStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  radioStyleText: {
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'uppercase',
    color: colors.color2,
  },
  btn: {
    backgroundColor: colors.colors3,
    borderRadius: 100,
    margin: 10,
    padding: 5,
  },
});
