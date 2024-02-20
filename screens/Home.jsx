import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import { Avatar, Button } from 'react-native-paper';
import { useEffect, useState } from 'react';
import SearchModel from '../components/SearchModel';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/action/productActions';
import { useIsFocused } from '@react-navigation/native';
import { useSetCategories } from '../utils/customHook';

export default function Home() {
  const [categoriesItem, setCategories] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchgQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(
    categoriesItem[0]?._id ? categoriesItem[0]?._id : ''
  );
  const addToCardHandler = (id) => {
    // console.log('Add to cart', id);
  };
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const isFocused = useIsFocused();
  useSetCategories(setCategories, isFocused);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(getAllProducts(searchgQuery, activeCategory));
    }, 500);
    return () => clearTimeout(timeOut);
  }, [dispatch, searchgQuery, activeCategory, isFocused]);

  return (
    <>
      {activeSearch && (
        <SearchModel
          searchgQuery={searchgQuery}
          setActiveSearch={setActiveSearch}
          products={products}
          setSearchQuery={setSearchQuery}
        />
      )}
      <View style={{ ...defaultStyle, flex: 1 }}>
        <Header />
        {/* Heading  */}
        <View
          style={{
            paddingTop: 70,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text style={{ fontSize: 25 }}>Our</Text>
            <Text style={{ fontSize: 25, fontWeight: '900' }}>Product</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => setActiveSearch((pre) => !pre)}>
              <Avatar.Icon
                icon={'magnify'}
                size={50}
                color={'gray'}
                style={{ backgroundColor: colors.color2, elevation: 12 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Categories  */}
        <View
          style={{
            flexDirection: 'row',
            height: 80,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              // zIndex: 100,
            }}
          >
            {categoriesItem?.map((item) => {
              return (
                <Button
                  key={item._id}
                  style={{
                    backgroundColor: activeCategory === item._id ? 'gray' : colors.colors5,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                  }}
                  onPress={() => setActiveCategory(item._id)}
                >
                  <Text
                    style={{
                      color: activeCategory === item._id ? colors.color2 : 'gray',
                    }}
                  >
                    {item.category}
                  </Text>
                </Button>
              );
            })}
          </ScrollView>
        </View>
        {/* Products */}
        <View style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, idx) => (
              <ProductCard
                stock={item?.stock}
                name={item?.name}
                price={item?.price}
                image={item?.images[0].url}
                addToCardHandler={addToCardHandler}
                id={item?._id}
                key={item?._id}
                idx={idx}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <Footer />
    </>
  );
}
