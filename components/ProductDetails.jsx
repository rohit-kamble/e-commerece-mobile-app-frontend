import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { colors, defaultStyle } from '../styles/styles';
import Header from './Header';
import Carousel from 'react-native-snap-carousel';
import { Avatar, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH;

const ProductDetails = ({
  route: {
    params: { id },
  },
}) => {
  const name = 'Mack book';
  const price = 5661;
  const description = 'prdouct Info';
  const stock = 2;
  const isCarousal = useRef(null);
  const [quantity, setQuntity] = useState(1);
  const images = [
    {
      id: 1,
      url: 'https://i5.walmartimages.com/asr/35b47efa-88ba-46ab-9faa-71096e67aed7.a7275eab204a8d8dc3d7949f0dbe74cc.jpeg',
    },
    {
      id: 2,
      url: 'https://images-na.ssl-images-amazon.com/images/G/02/aplusautomation/vendorimages/0b925aaf-0920-4019-a78e-dbe23cc1d1fa.jpg._CB536181688_.jpg',
    },
  ];

  const incrementQty = () => {
    if (stock <= quantity) return false;
    setQuntity((prv) => prv + 1);
  };
  const decrementQty = () => {
    if (quantity <= 1) return;
    setQuntity((prv) => prv - 1);
  };

  const addToCartHandler = () => {
    console.log('a');
    if (stock === 0)
      return Toast.show({
        type: 'error',
        text1: 'Out of Stock',
      });
    else {
      Toast.show({
        type: 'success',
        text1: 'Added to Cart',
      });
    }
  };
  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
        backgroundColor: colors.color1,
      }}
    >
      <Header isBack={true} />
      {/* Carousal */}
      {/* <View style={{}}> */}
      <Carousel
        layout="default"
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        ref={isCarousal}
        data={images}
        renderItem={CarousalCardItem}
      />
      {/* </View> */}

      <View
        style={{
          backgroundColor: colors.color2,
          padding: 35,
          flex: 1,
          marginTop: -400,
          borderTopRightRadius: 55,
          borderTopLeftRadius: 55,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            color: 'black',
            fontSize: 20,
          }}
        >
          {name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            color: 'black',
            fontSize: 20,
          }}
        >
          ${price}
        </Text>
        <Text
          numberOfLines={3}
          style={{
            letterSpacing: 1,
            lineHeight: 20,
            marginVertical: 15,
          }}
        >
          {description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              color: colors.colors3,
              fontWeight: '100',
            }}
          >
            Qunatity
          </Text>
          <View
            style={{
              width: 80,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={decrementQty}>
              <Avatar.Icon
                icon={'minus'}
                size={20}
                style={{
                  borderRadius: 5,
                  backgroundColor: colors.colors5,
                  height: 25,
                  width: 25,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                backgroundColor: colors.colors4,
                height: 25,
                width: 25,
                textAlignVertical: 'center',
                textAlign: 'center',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: colors.colors5,
              }}
            >
              {quantity}
            </Text>
            <TouchableOpacity onPress={incrementQty} activeOpacity={0.8}>
              <Avatar.Icon
                icon={'plus'}
                size={20}
                style={{
                  borderRadius: 5,
                  backgroundColor: colors.colors5,
                  height: 25,
                  width: 25,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={addToCartHandler}>
          <Button icon={'cart'} style={style.btn} textColor={colors.color2}>
            Add to Cart
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CarousalCardItem = ({ item, index }) => {
  return (
    <View key={index} style={style.container}>
      <Image source={{ uri: item.url }} style={style.image} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.colors1,
    width: ITEM_WIDTH,
    paddingVertical: 40,
    height: 380,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: 'contain',
    height: 200,
  },
  btn: {
    backgroundColor: colors.colors3,
    borderRadius: 100,
    padding: 5,
  },
});
export default ProductDetails;
