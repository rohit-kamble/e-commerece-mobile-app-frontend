import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Headline } from 'react-native-paper';
import { colors } from '../styles/styles';

export default function SelectComponent({
  visible,
  setVisible,
  setCategory,
  setCategoryId,
  categories = [],
}) {
  const selectCategoryHandler = (item) => {
    setCategory(item.category);
    setCategoryId(item._id);
    setVisible(false);
  };
  return (
    visible && (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Avatar.Icon
            size={30}
            icon={'close'}
            style={{
              alignSelf: 'flex-end',
              backgroundColor: colors.color1,
            }}
          />
        </TouchableOpacity>
        <Headline style={styles.heading}>Select a Category</Headline>
        <ScrollView>
          {categories.map((item) => {
            return (
              <Text key={item._id} onPress={() => selectCategoryHandler(item)} style={styles.text}>
                {item.category}
              </Text>
            );
          })}
        </ScrollView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color2,
    position: 'absolute',
    padding: 35,
    borderRadius: 20,
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    elevation: 5,
    top: 50,
  },
  heading: {
    textAlign: 'center',
    marginVertical: 10,
    padding: 3,
    backgroundColor: colors.colors3,
    borderRadius: 5,
    color: colors.color2,
  },
  text: {
    fontSize: 17,
    fontWeight: '100',
    textTransform: 'uppercase',
    marginVertical: 10,
  },
});
