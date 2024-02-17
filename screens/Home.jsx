import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import { Avatar, Button } from 'react-native-paper';
import { useEffect, useState } from 'react';
import SearchModel from '../components/SearchModel';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/action/productActions';
// export const products = [
//   {
//     price: 15641,
//     name: 'Apple',
//     stock: 3,
//     _id: 1,
//     category: 'ded',
//     imgSrc: [
//       {
//         url: 'https://th.bing.com/th/id/R.10de91f6d1168328cea973924ca4798a?rik=yT5AaWNiMq36dQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f06%2fSamsung-Mobile-Phone-Free-PNG-Image.png&ehk=%2fWx4YYOAzjYQKmBir3a69prbNhpCfpecBzh%2fmwxrW08%3d&risl=&pid=ImgRaw&r=0',
//       },
//     ],
//   },
//   {
//     price: 15641,
//     name: 'Mac book',
//     stock: 4,
//     _id: 2,
//     category: 'dedsd',
//     imgSrc: [
//       {
//         url: 'https://th.bing.com/th/id/R.10de91f6d1168328cea973924ca4798a?rik=yT5AaWNiMq36dQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2016%2f06%2fSamsung-Mobile-Phone-Free-PNG-Image.png&ehk=%2fWx4YYOAzjYQKmBir3a69prbNhpCfpecBzh%2fmwxrW08%3d&risl=&pid=ImgRaw&r=0',
//       },
//     ],
//   },
// ];

export default function Home() {
  const categories = ['mobile', 'chair', 'tables', 'fruitr', 'cloth'];
  const [categoriesItem, setCatories] = useState('mobile');
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchgQuery, setSearchQuery] = useState('');
  const addToCardHandler = (id) => {
    console.log('Add to cart', id);
  };
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
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
            {categories.map((item) => {
              return (
                <Button
                  key={item}
                  style={{
                    backgroundColor: categoriesItem === item ? 'gray' : colors.colors5,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                  }}
                  onPress={() => setCatories(item)}
                >
                  <Text
                    style={{
                      color: categoriesItem === item ? colors.colors5 : 'gray',
                    }}
                  >
                    {item}
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
                image={item?.images[0]?.url}
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
