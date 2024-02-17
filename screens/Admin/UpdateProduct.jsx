import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { defaultStyle, colors, inputStyling } from '../../styles/styles';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
import SelectComponent from '../../components/SelectComponent';

const images = [
  {
    url: 'https://create.microsoft.com/_next/image?url=https%3A%2F%2Fdsgrcdnblobprod5u3.azureedge.net%2Fcmsassets%2FTransparentLogo-HERO.webp&w=1920&q=75',
    _id: 'efefef',
  },
  {
    url: 'https://create.microsoft.com/_next/image?url=https%3A%2F%2Fdsgrcdnblobprod5u3.azureedge.net%2Fcmsassets%2FTransparentLogo-HERO.webp&w=1920&q=75',
    _id: 'efefefeef',
  },
];

export default function UpdateProduct({ navigation, route }) {
  const [id] = useState(route.params.id);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Laptop');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([
    {
      _id: 'ddwdwr',
      category: 'Laptop',
    },
    {
      _id: 'fefefve',
      category: 'Mobile',
    },
    {
      _id: 'ddwdwdwdr',
      category: 'Pen',
    },
  ]);
  const [visible, setVisible] = useState(false);
  const submitHandler = () => {};

  const loading = false;
  const otherLoading = true;
  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.colors5 }}>
        <Header isBack={true} />
        <View style={{ paddingTop: 70, marginBottom: 20 }}>
          <Text style={styles.heading}>Update Product</Text>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            style={{
              padding: 20,
              elevation: 10,
              borderRadius: 10,
              backgroundColor: colors.colors3,
            }}
          >
            <View
              style={{
                // justifyContent: 'center',
                height: 650,
              }}
            >
              <Button
                textColor={colors.color1}
                onPress={() =>
                  navigation.navigate('productimages', {
                    id,
                    images: images,
                  })
                }
              >
                Manage Images
              </Button>
              <TextInput
                mode="outlined"
                activeOutlineColor={colors.color1}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={inputStyling}
              />
              <TextInput
                mode="outlined"
                activeOutlineColor={colors.color1}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={inputStyling}
              />
              <TextInput
                mode="outlined"
                activeOutlineColor={colors.color1}
                placeholder="Price"
                keyboardType="number-pad"
                value={price}
                onChangeText={setPrice}
                style={inputStyling}
              />
              <TextInput
                mode="outlined"
                activeOutlineColor={colors.color1}
                placeholder="Stock"
                keyboardType="number-pad"
                value={stock}
                onChangeText={setStock}
                style={inputStyling}
              />
              <Text
                style={{
                  ...inputStyling,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  borderRadius: 3,
                }}
                onPress={() => setVisible(true)}
              >
                {category}
              </Text>
              <Button
                textColor={colors.color2}
                style={{
                  backgroundColor: colors.color1,
                  margin: 20,
                  padding: 6,
                }}
                onPress={submitHandler}
                loading={otherLoading}
              >
                Update
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
      <SelectComponent {...{ visible, setVisible, setCategory, setCategoryId, categories }} />
    </>
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
