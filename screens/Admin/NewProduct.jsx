import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { defaultStyle, colors, inputStyling } from '../../styles/styles';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import SelectComponent from '../../components/SelectComponent';
import { useSetCategories, useMessageAndErrorFromOther } from '../../utils/customHook';
import { useIsFocused } from '@react-navigation/native';
import mime from 'mime';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../redux/action/otherAction';

export default function NewProduct({ navigation, route }) {
  const dispatch = useDispatch();
  const [id] = useState(route.params?.id);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Choose Category');
  const [categoryId, setCategoryId] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();
  useSetCategories(setCategories, isFocused);

  const condition = !name || !description || !price || !stock || !image;
  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('description', description);
    myForm.append('price', price);
    myForm.append('stock', stock);
    myForm.append('file', {
      uri: image,
      type: mime.getType(image),
      name: image.split('/').pop(),
    });
    // console.log(categoryId);
    if (categoryId) myForm.append('category', categoryId);
    dispatch(createProduct(myForm));
  };
  const { loading } = useMessageAndErrorFromOther({
    dispatch,
    navigation,
    navigateTo: 'adminpannel',
  });

  // const loading = false;
  //   const otherLoading = true;

  useEffect(() => {
    if (route.params?.image) {
      setImage(route.params?.image);
    }
  }, [route.params]);

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.colors5 }}>
        <Header isBack={true} />
        <View style={{ paddingTop: 70, marginBottom: 20 }}>
          <Text style={styles.heading}>New Product</Text>
        </View>

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
            <View
              style={{
                width: 80,
                height: 80,
                alignSelf: 'center',
                marginBottom: 20,
              }}
            >
              <Avatar.Image
                size={100}
                style={{
                  backgroundColor: colors.color1,
                }}
                source={{
                  uri: image ? image : null,
                }}
              />
              <TouchableOpacity onPress={() => navigation.navigate('camera', { newProduct: true })}>
                <Avatar.Icon
                  icon={'camera'}
                  size={30}
                  color={colors.colors3}
                  style={{
                    backgroundColor: colors.color2,
                    position: 'absolute',
                    bottom: 0,
                    right: -5,
                  }}
                />
              </TouchableOpacity>
            </View>
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
              // disabled={condition}
              textColor={colors.color2}
              style={{
                backgroundColor: colors.color1,
                margin: 20,
                padding: 6,
              }}
              onPress={submitHandler}
              loading={loading}
              disabled={condition || loading}
            >
              Create
            </Button>
          </View>
        </ScrollView>
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
