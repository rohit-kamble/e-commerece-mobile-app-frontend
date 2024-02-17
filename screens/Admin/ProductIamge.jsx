import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { defaultStyle, colors } from '../../styles/styles';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import ImageCard from '../../components/ImageCard';
import { Avatar, Button } from 'react-native-paper';

export default function Productimage({ route, navigation }) {
  // const [iimages, setImages] = useState([])
  const [images] = useState(route.params.images);
  const [productId] = useState(route.params.id);
  const [image, setImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const submitHandler = () => {};
  const deleteHandler = () => {};
  const loading = false;
  useEffect(() => {
    if (route.params?.image) {
      setImage(route.params?.image);
      setImageChanged(true);
    }
  }, [route.params]);
  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.colors5 }}>
      <Header isBack={true} />
      <View style={{ marginBottom: 20, paddingTop: 70 }}>
        <Text style={styles.heading}>Image Product</Text>
      </View>
      <ScrollView
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 40,
          }}
        >
          {images.map((item) => {
            return <ImageCard src={item.url} id={item._id} deleteHandler={deleteHandler} />;
          })}
        </View>
      </ScrollView>
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: colors.colors3,
        }}
      >
        <Image
          style={{
            backgroundColor: colors.color2,
            width: 100,
            height: 100,
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
          source={{
            uri: image ? image : null,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('camera', { updateProduct: true })}
          >
            <Avatar.Icon
              icon={'camera'}
              style={{
                backgroundColor: colors.color2,
                margin: 10,
              }}
              size={30}
              color={colors.colors3}
            />
          </TouchableOpacity>
        </View>
        <Button
          style={{
            backgroundColor: colors.color1,
            padding: 6,
          }}
          textColor={colors.color2}
          loading={loading}
          onPress={submitHandler}
          disabled={!imageChanged}
        >
          Add
        </Button>
      </View>
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
