import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-svg';
import {LineChart} from 'react-native-svg-charts';
import {useGetCoinChartQuery} from '../store/api/coinDetailsApi';

type Props = {
  coinId: string;
  vsCurrency: string;
  color?: string;
  height?: number;
};

const CoinChart: React.FC<Props> = ({coinId, vsCurrency, color, height}) => {
  const {data, isLoading} = useGetCoinChartQuery({id: coinId, vsCurrency});

  if (!data && isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <LineChart
      style={{height: height || 200}}
      data={data?.prices.map(x => x[1]) || []}
      svg={{stroke: color || 'rgb(134, 65, 244)'}}
      contentInset={{top: 20, bottom: 20}}
    />
  );
};

export default CoinChart;
