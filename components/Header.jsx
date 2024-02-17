import { Avatar } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../styles/styles';

export default function Header({ isBack, emptyCart = false }) {
  const navigate = useNavigation();
  const route = useRoute();
  const emptyCartHandler = () => {
    navigate.navigate('cart');
  };
  console.log('route---', route.name);
  return (
    <View style={{ height: 40 }}>
      {isBack && (
        <View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              left: 20,
              zIndex: 10,
            }}
            onPress={() => navigate.goBack()}
          >
            <Avatar.Icon
              icon={'arrow-left'}
              style={{
                backgroundColor: colors.colors4,
              }}
              color={route.name === 'productdetails' ? colors.colors2 : colors.color1}
            />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          right: 20,
          zIndex: 10,
        }}
        onPress={() => (emptyCart ? emptyCartHandler : navigate.navigate('cart'))}
      >
        <Avatar.Icon
          style={{
            backgroundColor: colors.colors4,
          }}
          icon={emptyCart ? 'delete-outline' : 'cart-outline'}
          color={route.name === 'productdetails' ? colors.colors2 : colors.colors3}
        />
      </TouchableOpacity>
    </View>
  );
}
