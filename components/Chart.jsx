import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { colors } from '../styles/styles';
const screenWidth = Dimensions.get('screen').width - 100;

export default function Chart({ inStock = 0, outOfStock = 0 }) {
  const data = [
    {
      name: 'Out of stock',
      population: outOfStock,
      color: colors.color1_light,
      legendFontColor: colors.color2,
      legendFontSize: 15,
    },
    {
      name: 'In Stock',
      population: inStock,
      color: colors.color1_light2,
      legendFontColor: colors.color2,
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    color: (opacity) => `rgba(26,255,146, ${opacity})`,
  };
  return (
    // <View>
    <PieChart
      data={data}
      width={screenWidth}
      height={150}
      chartConfig={chartConfig}
      accessor={'population'}
      backgroundColor={colors.colors3}
      paddingLeft={'0'}
      center={[10, 0]}
      absolute
    />
    // </View>
  );
}
