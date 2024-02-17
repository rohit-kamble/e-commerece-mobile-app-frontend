import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { Headline } from 'react-native-paper';
import OrderItem from '../components/OrderItem';
const orders = [
  {
    _id: 'ss',
    shippingInfo: {
      address: 'b/2 paritosh',
      city: 'ambernath',
      country: 'india',
    },
    createdAt: 'jdknjld',
    orderStatus: 'processing',
    paymentMethod: 'COD',
    totalAmount: 20000,
  },
  {
    _id: 'ss2',
    shippingInfo: {
      address: 'b/2 paritosh',
      city: 'ambernath',
      country: 'india',
    },
    createdAt: 'jdknjld',
    orderStatus: 'processing',
    paymentMethod: 'COD',
    totalAmount: 20000,
  },
];
export default function Orders() {
  const loading = false;
  return (
    <View style={[defaultStyle, { backgroundColor: colors.colors5 }]}>
      <Header isBack={true} />

      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={styles.heading}>Sign Up</Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            padding: 10,
            flex: 1,
          }}
        >
          <ScrollView showsHorizontalScrollIndicator={false}>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <OrderItem
                  key={item._id}
                  i={index}
                  id={item._id}
                  price={item.totalAmount}
                  address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country}`}
                  orderedOn={item.createdAt}
                  status={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  updateHandler={() => console.log('')}
                  admin={true}
                />
              ))
            ) : (
              <Headline style={{ textAlign: 'center' }}>No Order Yet</Headline>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: colors.color1,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.colors3,
    borderRadius: 10,
    justifyContent: 'center',
  },
  forget: {
    color: colors.color2,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'flex-end',
    fontWeight: '100',
    textAlign: 'right',
  },
  btn: {
    backgroundColor: colors.color1,
    margin: 20,
    padding: 6,
    color: colors.color2,
  },
  or: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '100',
    color: colors.color2,
  },
  link: {
    alignSelf: 'center',
    color: colors.color2,
    fontSize: 18,
    textTransform: 'uppercase',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
