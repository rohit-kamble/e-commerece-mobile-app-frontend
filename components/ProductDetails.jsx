import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors, defaultStyle } from '../styles/styles';
import Header from './Header';
import Carousel from 'react-native-snap-carousel';
import { Avatar, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getProductDetails } from '../redux/action/productActions.js';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH;

const ProductDetails = ({
  route: {
    params: { id },
  },
}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const isCarousal = useRef(null);

  const {
    product: { name, price, stock, description, images, quantity: qty },
  } = useSelector((state) => state.products);
  const [quantity, setQuntity] = useState(qty || 1);
  const incrementQty = () => {
    if (stock <= quantity)
      return Toast.show({
        type: 'error',
        text1: 'Maximum value added',
      });
    setQuntity((prv) => prv + 1);
  };
  const decrementQty = () => {
    if (quantity <= 1) return;
    setQuntity((prv) => prv - 1);
  };

  const addToCartHandler = () => {
    if (stock === 0)
      return Toast.show({
        type: 'error',
        text1: 'Out of Stock',
      });
    dispatch({
      type: 'addToCart',
      payload: {
        product: id,
        name,
        price,
        image: images[0]?.url,
        stock,
        quantity: quantity,
      },
    });
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
    });
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, isFocused]);
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
