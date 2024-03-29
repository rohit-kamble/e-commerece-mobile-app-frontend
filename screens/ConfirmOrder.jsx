import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
// import { cartItems } from '../screens/Cart';
import ConfirmOrderItem from '../components/ConfirmOrderItem';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { State } from 'react-native-gesture-handler';

export default function ConfirmOrder() {
  const { cartItem } = useSelector((state) => state.cart);
  const itemPrice = cartItem?.reduce((prev, curr) => prev + curr.quantity * curr.price, 0);
  // console.log(cartItem);
  const shippingPrice = itemPrice > 10000 ? 0 : 200;
  const tax = Number((0.18 * itemPrice).toFixed());
  const totalAmount = itemPrice + shippingPrice + tax;
  const navigate = useNavigation();

  return (
    <View style={defaultStyle}>
      <Header isBack={true} />
      {/* <Text>Confirm Order</Text> */}
      <View style={{ paddingTop: 70 }}>
        <Text>Confirm</Text>
        <Text style={{ fontWeight: 'bold' }}>Order</Text>
      </View>
      <View
        style={{
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <ScrollView>
          {cartItem.map((item) => (
            <ConfirmOrderItem key={item.product} item={item} />
          ))}
        </ScrollView>
      </View>
      <PriceTag heading={'Subtotal'} value={itemPrice} />
      <PriceTag heading={'Shipping'} value={shippingPrice} />
      <PriceTag heading={'Tax'} value={tax} />
      <PriceTag heading={'Total'} value={totalAmount} />
      <TouchableOpacity
        onPress={() => navigate.navigate('payment', { itemPrice, shippingPrice, tax, totalAmount })}
      >
        <Button
          style={{
            backgroundColor: colors.colors3,
            borderRadius: 100,
            padding: 5,
            margin: 10,
          }}
          textColor={colors.color2}
          icon={'chevron-right'}
        >
          Payment
        </Button>
      </TouchableOpacity>
    </View>
  );
}

const PriceTag = ({ heading, value }) => {
  return (
    <View
      key={value + heading}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
      }}
    >
      <Text style={{ fontWeight: '800' }}>{heading}</Text>
      <Text>${value}</Text>
    </View>
  );
};
