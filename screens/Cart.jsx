import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import { Button } from 'react-native-paper';
import Cartitem from '../components/CartItem';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

export default function Cart() {
  const navigate = useNavigation();

  const incrementtHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity + 1;
    if (stock <= quantity)
      return Toast.show({
        type: 'error',
        text1: 'Maximum Value added',
      });
    dispatch({
      type: 'addToCart',
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.cart);

  const decrementHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return dispatch({ type: 'removeFromCart', payload: id });
    dispatch({
      type: 'addToCart',
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };

  const total = cartItem?.reduce((prev, curr) => prev + curr.quantity * curr.price, 0);
  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
      }}
    >
      {/* Heading */}
      <Header isBack={true} emptyCart={true} />
      <Heading />
      <View
        style={{
          paddingVertical: 20,
          flex: 1,
          // flexDirection: 'column',
          // backgroundColor: 'red',
        }}
      >
        <ScrollView>
          {cartItem.length > 0 ? (
            cartItem.map((item, idx) => (
              <Cartitem
                item={{
                  ...item,

                  index: idx,
                  incrementtHandler: incrementtHandler,
                  decrementHandler: decrementHandler,
                }}
                key={idx}
              />
            ))
          ) : (
            <Text style={{ textAlign: 'center' }}>No Items</Text>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 35,
        }}
      >
        <Text>{cartItem.length} ITEMs</Text>
        <Text>${total}</Text>
      </View>
      <TouchableOpacity
        onPress={
          cartItem.length > 0 ? () => navigate.navigate('Confirmorder') : () => navigate.goBack()
        }
      >
        <Button
          style={{
            backgroundColor: colors.colors3,
            borderRadius: 100,
            padding: 5,
            margin: 30,
          }}
          icon={'cart'}
          textColor={colors.color2}
        >
          Checkout
        </Button>
      </TouchableOpacity>
    </View>
  );
}

const Heading = () => {
  return (
    <View
      style={{
        paddingTop: 70,
        marginLeft: 35,
      }}
    >
      <Text style={{ fontSize: 25 }}>Shopping</Text>
      <Text style={{ fontSize: 25, fontWeight: 900 }}>Cart</Text>
    </View>
  );
};
