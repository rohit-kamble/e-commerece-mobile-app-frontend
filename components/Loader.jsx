import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../styles/styles';

export default function Loader() {
  return (
    <ActivityIndicator
      style={{
        top: '50%',
        position: 'absolute',
        alignSelf: 'center',
      }}
      color={colors.colors3}
      size={100}
    />
  );
}
