import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { defaultStyle, colors } from '../../styles/styles';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import OrderItem from '../../components/OrderItem';
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
export default function AdminOrder() {
  const loading = false;
  const processOrderLoading = true;
  const updateHandler = () => {};
  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.colors5 }}>
      <Header isBack={true} />
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={styles.heading}>All order</Text>
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
                  updateHandler={updateHandler}
                  admin={true}
                  loading={processOrderLoading}
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
  container: {
    elevation: 7,
    backgroundColor: colors.colors3,
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: colors.color1,
    color: colors.color2,
    padding: 5,
    borderRadius: 5,
  },
  name: {
    fontWeight: '400',
    color: colors.color2,
    marginTop: 10,
    color: colors.color2,
  },
});
