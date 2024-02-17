import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import { Button } from 'react-native-paper';
import Cartitem from '../components/CartItem';
import { useNavigation } from '@react-navigation/native';
import t_img from '../assets/t_img.svg';

export const cartItems = [
  {
    name: 'Macbook',
    image:
      'data:image/jpeg;base64,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',
    product: 'abc',
    stock: 3,
    price: 3999,
    quantity: 2,
    id: 'p1',
  },
  {
    name: 'Macbook mmini',
    image:
      'https://create.microsoft.com/_next/image?url=https%3A%2F%2Fdsgrcdnblobprod5u3.azureedge.net%2Fcmsassets%2FTransparentLogo-HERO.webp&w=1920&q=75',
    product: 'dd',
    stock: 5,
    price: 5999,
    quantity: 3,
    id: 'p2',
  },
];

export default function Cart() {
  const navigate = useNavigation();
  const incrementtHandler = (id, quantity, stock) => {
    console.log(id, quantity, stock);
  };

  const decrementHandler = (id, quantity) => {};

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
          // flexDirection: 'column'
          // backgroundColor: 'red'
        }}
      >
        <ScrollView>
          {cartItems.map((item, idx) => (
            <Cartitem
              item={{
                ...item,
                index: idx,
                incrementtHandler: incrementtHandler,
                decrementHandler: decrementHandler,
              }}
              key={idx}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 35,
        }}
      >
        <Text>5 ITEMs</Text>
        <Text>$5</Text>
      </View>
      <TouchableOpacity
        onPress={cartItems.length > 0 ? () => navigate.navigate('Confirmorder') : navigate.goBack()}
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
