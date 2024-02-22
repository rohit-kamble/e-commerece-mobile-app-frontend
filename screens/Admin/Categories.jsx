import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { colors, defaultStyle, inputStyling } from '../../styles/styles';
import Header from '../../components/Header';
import CategoryCard from '../../components/CategoryCard';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import { useMessageAndErrorFromOther, useSetCategories } from '../../utils/customHook';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addCategory, deleteCategory } from '../../redux/action/otherAction';

export default function Categories({ navigation }) {
  const [category, setCatgory] = useState('');
  const [categories, setCategories] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useSetCategories(setCategories, isFocused);
  const { loading } = useMessageAndErrorFromOther(dispatch, navigation, 'adminpannel');
  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
    // console.log('call');
  };

  const submitCategory = () => {
    dispatch(addCategory(category));
  };

  // const loading = false;

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.colors5 }}>
      <Header isBack={true} />
      <View style={{ paddingTop: 70, marginBottom: 20 }}>
        <Text style={styles.heading}>Categories</Text>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 20,
            minHeight: 400,
          }}
        >
          {categories.map((item) => (
            <CategoryCard
              name={item.category}
              id={item._id}
              key={item._id}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.container}>
        <TextInput
          style={{ ...inputStyling, width: '100%' }}
          value={category}
          onChangeText={setCatgory}
          placeholder="Add category"
        />
        <Button
          textColor={colors.color2}
          style={{
            backgroundColor: colors.color1,
            margin: 20,
            padding: 0,
          }}
          loading={loading}
          disabled={!category}
          onPress={submitCategory}
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
