import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { colors } from '../styles/styles';
import { useState } from 'react';
import MyModal from './MyModal';

export default function ProductListItem({
  navigation,
  deleteHandler,
  i,
  price,
  stock,
  name,
  category,
  imgSrc,
  id,
}) {
  const [openModal, setOpenModal] = useState('');
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={() => deleteHandler(id)}
        onPress={() => setOpenModal((prev) => !prev)}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: i % 2 === 0 ? colors.color1 : colors.colors3,
          }}
        >
          <Image
            source={{
              uri: imgSrc,
            }}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              width: 60,
              color: colors.color2,
            }}
            numberOfLines={1}
          >
            ${price}
          </Text>
          <Text
            style={{
              maxWidth: 60,
              color: colors.color2,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text
            style={{
              width: 60,
              color: colors.color2,
            }}
            numberOfLines={1}
          >
            {category}
          </Text>
          <Text
            style={{
              width: 40,
              color: colors.color2,
            }}
            numberOfLines={1}
          >
            {stock}
          </Text>
        </View>
      </TouchableOpacity>
      {openModal && (
        <MyModal
          deleteHandler={deleteHandler}
          id={id}
          navigate={navigation}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});
