import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/styles';
import { Button } from 'react-native-paper';

export default function ProductCard({ stock, name, price, image, id, addToCardHandler, idx }) {
  const navigate = useNavigation();
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => navigate.navigate('productdetails', { id })}>
      <View
        style={{
          elevation: 5,
          width: 220,
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 20,
          borderRadius: 20,
          height: 400,
          backgroundColor: idx % 2 === 0 ? colors.color1 : colors.color2,
        }}
      >
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'contain',
            position: 'absolute',
            left: 50,
            top: 105,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              color: idx % 2 === 0 ? colors.color2 : colors.colors3,
              fontSize: 25,
              fontWeight: '300',
            }}
          >
            {name}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: idx % 2 === 0 ? colors.color2 : colors.colors3,
              fontSize: 25,
              fontWeight: '700',
            }}
          >
            ${price}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: idx % 2 === 0 ? colors.color2 : colors.colors3,
            borderRadius: 0,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            width: '100%',
          }}
        >
          <Button
            onPress={() => addToCardHandler(id, stock)}
            textColor={idx % 2 === 0 ? colors.color1 : colors.colors2}
          >
            Add to cart
          </Button>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
