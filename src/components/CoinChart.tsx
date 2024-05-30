import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import colors from '../consts/Colors';
import {useGetCoinChartQuery} from '../store/api/coinDetailsApi';
import {dayMonthDate} from '../utils/dates';

type Props = {
  coinId: string;
  vsCurrency: string;
  color?: string;
  height?: number;
};

const CoinChart: React.FC<Props> = ({
  coinId,
  vsCurrency,
  color = colors.primary,
  height = 250,
}) => {
  const [days, setDays] = React.useState<30 | 7>(30);
  const {data, isLoading} = useGetCoinChartQuery({
    id: coinId,
    vsCurrency,
    days,
  });
  const chartPrices = useMemo(() => data?.prices.map(x => x[1]) || [], [data]);
  const chartTimes: Date[] = useMemo(
    () => data?.prices.map(x => new Date(x[0])) || [],
    [data],
  );

  if (!data && isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.daysSelector}>
        <TouchableOpacity
          style={[styles.daysButton, days === 30 && styles.selectedButton]}
          onPress={() => setDays(30)}>
          <Text
            style={[
              styles.daysButtonText,
              days === 30 && styles.selectedButtonText,
            ]}>
            1M
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.daysButton, days === 7 && styles.selectedButton]}
          onPress={() => setDays(7)}>
          <Text
            style={[
              styles.daysButtonText,
              days === 7 && styles.selectedButtonText,
            ]}>
            1W
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <YAxis
          data={chartPrices}
          contentInset={{top: 20, bottom: 20}}
          svg={{
            fill: colors.darkGrey,
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={value => `${value}`}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <LineChart
            style={{flex: 1, height}}
            data={chartPrices}
            svg={{stroke: color, strokeWidth: 2}}
            contentInset={{top: 20, bottom: 20}}>
            <Grid />
          </LineChart>
          <XAxis
            style={{marginHorizontal: -10}}
            data={chartTimes}
            formatLabel={idx => dayMonthDate(chartTimes[idx])}
            contentInset={{left: 10, right: 10}}
            numberOfTicks={6}
            svg={{fontSize: 10, fill: colors.darkGrey}}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.grey,
    marginVertical: 5,
  },
  daysSelector: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  daysButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginRight: 5,
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  daysButtonText: {
    color: colors.black,
  },
  selectedButtonText: {
    color: colors.white,
  },
});

export default CoinChart;
