import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/styles';
import { Avatar } from 'react-native-paper';

export default function CategoryCard({ name, id, deleteHandler }) {
  return (
    <View style={styles.cradContainer}>
      <Text style={styles.cardText}>{name}</Text>
      <TouchableOpacity onPress={() => deleteHandler(id)}>
        <Avatar.Icon
          icon="delete"
          size={30}
          style={{
            borderStartColor: colors.color1,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cradContainer: {
    backgroundColor: colors.color2,
    elevation: 2,
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardText: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
