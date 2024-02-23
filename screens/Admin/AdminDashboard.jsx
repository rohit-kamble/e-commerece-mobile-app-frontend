import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { defaultStyle, colors } from '../../styles/styles';
import Loader from '../../components/Loader';
import ButtonBox from '../../components/ButtonBox';
import ProductListHeading from '../../components/ProductListHeading';
// import { products } from '../Home';
import ProductListItem from '../../components/ProductListItem';
import Chart from '../../components/Chart';
import { useAdminProducts, useMessageAndErrorFromOther } from '../../utils/customHook.js';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { deleteProduct } from '../../redux/action/otherAction.js';
import { getAdminProducts } from '../../redux/action/productActions.js';
const products = [];
export default function AdminDashboard({ navigation }) {
  // const loading = false;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

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
    // console.log('id--', id);
    dispatch(deleteProduct(id));
  };
  const { loading: loadingDelete } = useMessageAndErrorFromOther(
    dispatch,
    null,
    null,
    getAdminProducts
  );

  const { products, inStock, outOfStock, loading } = useAdminProducts(dispatch, isFocused);
  return (
    <View style={defaultStyle}>
      <Header isBack={true} />
      <View style={{ paddingTop: 70, marginBottom: 20 }}>
        <Text style={styles.heading}>Admin Panel</Text>
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
            <Chart inStock={inStock || 0} outOfStock={outOfStock || 0} />
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
              {!loadingDelete &&
                products.map((item, index) => {
                  return (
                    <ProductListItem
                      navigation={navigation}
                      deleteHandler={deleteHandler}
                      key={item?._id}
                      i={index}
                      price={item?.price}
                      stock={item?.stock}
                      name={item?.name}
                      category={item?.category?.category}
                      imgSrc={item.images[0]?.url}
                      id={item?._id}
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
