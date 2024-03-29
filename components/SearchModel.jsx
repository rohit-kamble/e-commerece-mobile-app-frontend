import { useNavigation } from '@react-navigation/native';
import {
  Platform,
  StatusBar,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import { colors } from '../styles/styles';
import { Headline, Searchbar } from 'react-native-paper';
import { useEffect } from 'react';

export default function SearchModel({ searchgQuery, setActiveSearch, products, setSearchQuery }) {
  const navigate = useNavigation();
  const backAction = () => {
    setSearchQuery('');
    setActiveSearch(false);
    return true; // prevent to close app
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 100,
        backgroundColor: colors.color2,
        padding: 30,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <SafeAreaView>
        <Searchbar
          placeholder="Search..."
          onChangeText={(txt) => setSearchQuery(txt)}
          value={searchgQuery}
          style={{
            marginTop: 20,
          }}
        />
        <ScrollView>
          <View
            style={{
              paddingVertical: 40,
              paddingHorizontal: 10,
            }}
          >
            {products.map((item) => (
              <SearchItem
                key={item?._id}
                imgSrc={item?.images[0]?.url}
                name={item?.name}
                price={item?.price}
                handler={() => navigate.navigate('productdetails', { id: item?._id })}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const SearchItem = ({ handler, imgSrc, name, price }) => {
  return (
    <TouchableOpacity onPress={handler}>
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: colors.color2,
          elevation: 5,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          marginVertical: 30,
        }}
      >
        <Image
          source={{
            uri: imgSrc,
          }}
          style={{
            width: 80,
            height: 80,
            position: 'absolute',
            resizeMode: 'contain',
            top: -15,
            left: 10,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
        <View
          style={{
            width: '80%',
            paddingHorizontal: 30,
          }}
        >
          <Text numberOfLines={1}>{name}</Text>
          <Headline
            numberOfLines={1}
            style={{
              fontWeight: '900',
            }}
          >
            ${price}
          </Headline>
        </View>
      </View>
    </TouchableOpacity>
  );
};
