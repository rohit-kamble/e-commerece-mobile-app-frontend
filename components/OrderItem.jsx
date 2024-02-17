import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/styles';
import { Button } from 'react-native-paper';

export default function OrderItem({
  id,
  price,
  address,
  orderedOn,
  status,
  paymentMethod,
  updateHandler,
  admin = false,
  i = 0,
}) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: i % 2 === 0 ? colors.color2 : colors.colors3,
      }}
    >
      <Text
        style={[styles.text, { backgroundColor: i % 2 === 0 ? colors.colors3 : colors.color1 }]}
      >
        ID- # {id}
      </Text>
      <TextBox {...{ title: 'Address', value: address, i }} />
      <TextBox {...{ title: 'Ordered On', value: orderedOn, i }} />
      <TextBox {...{ title: 'Price', value: price, i }} />
      <TextBox {...{ title: 'Status', value: status, i }} />
      <TextBox {...{ title: 'Payment Method', value: paymentMethod, i }} />
      {admin && (
        <Button
          mode={'contained'}
          icon={'update'}
          textColor={i % 2 === 0 ? colors.color2 : colors.colors3}
          style={{
            width: 120,
            alignSelf: 'center',
            marginTop: 20,
            backgroundColor: i % 2 === 0 ? colors.colors3 : colors.color2,
          }}
          onPress={() => updateHandler(id)}
          // loading={loading}
          // disabled={loading}
        >
          Update
        </Button>
      )}
    </View>
  );
}

const TextBox = ({ title, value, i }) => (
  <Text
    style={{
      marginVertical: 6,
      color: i % 2 === 0 ? colors.colors3 : colors.color2,
    }}
  >
    <Text style={{ fontWeight: '600' }}>{title} - </Text>
    {title === 'Price' ? '$' : ''}
    {value}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    paddingVertical: 10,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginTop: -20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
