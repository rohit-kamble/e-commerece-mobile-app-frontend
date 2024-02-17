import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { defaultStyle, colors } from '../../styles/styles';
import Loader from '../../components/Loader';
import ButtonBox from '../../components/ButtonBox';
import ProductListHeading from '../../components/ProductListHeading';
import { products } from '../Home';
import ProductListItem from '../../components/ProductListItem';
import Chart from '../../components/Chart';

export default function AdminDashboard({ navigation }) {
  const loading = false;
  const navigationHandler = (text) => {
    switch (text) {
      case 'Category':
        navigation.navigate('categories');
        break;
      case 'All Orders':
        navigation.navigate('adminorder');
        break;
      case 'Product':
        navigation.navigate('newproduct');
        break;
      default:
        break;
    }
  };
  const deleteHandler = (id) => {
    console.log('id deleted item', id);
  };
  return (
    <View style={defaultStyle}>
      <Header isBack={true} />
      <View style={{ paddingTop: 70, marginBottom: 20 }}>
        <Text style={styles.heading}>Admin Pannel</Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View
            style={{
              backgroundColor: colors.colors3,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <Chart inStock={12} outOfStock={3} />
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                justifyContent: 'space-between',
              }}
            >
              <ButtonBox icon={'plus'} text={'Product'} handler={navigationHandler} />
              <ButtonBox
                icon={'format-list-bulleted-square'}
                text={'All Orders'}
                handler={navigationHandler}
              />
              <ButtonBox icon={'plus'} text={'Category'} handler={navigationHandler} />
            </View>
          </View>
          <ProductListHeading />
          <ScrollView>
            <View
              style={{
                justifyContent: 'space-evenly',
              }}
            >
              {products.map((item, index) => {
                return (
                  <ProductListItem
                    navigation={navigation}
                    deleteHandler={deleteHandler}
                    key={item._id}
                    i={index}
                    price={item.price}
                    stock={item.stock}
                    name={item.name}
                    category={item.category}
                    imgSrc={item.imgSrc[0].url}
                    id={item._id}
                  />
                );
              })}
            </View>
          </ScrollView>
        </>
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
