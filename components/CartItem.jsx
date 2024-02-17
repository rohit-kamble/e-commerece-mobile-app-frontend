import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/styles';
import { Avatar } from 'react-native-paper';

export default function Cartitem({ item }) {
  const { name, index, image, price, quantity, incrementtHandler, decrementHandler, stock, id } =
    item;
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 20,
      }}
    >
      <View
        style={{
          width: '30%',
          backgroundColor: index % 2 === 0 ? colors.color1 : colors.colors3,
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        }}
      >
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
            top: '0%',
            left: '20%',
          }}
        />
      </View>
      <View
        style={{
          width: '40%',
          paddingHorizontal: 25,
        }}
      >
        <Text>{name}</Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
            fontWeight: '900',
          }}
        >
          ${price}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          width: '20%',
          height: 80,
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}
      >
        <TouchableOpacity onPress={() => decrementHandler(id, quantity)}>
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
        <Text style={styles.qtyText}>{quantity}</Text>
        <TouchableOpacity onPress={() => incrementtHandler(id, quantity, stock)}>
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
  );
}

const styles = StyleSheet.create({
  qtyText: {
    backgroundColor: colors.colors4,
    height: 25,
    width: 25,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.colors5,
  },
});
