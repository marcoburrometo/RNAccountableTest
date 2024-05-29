import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-svg-charts';
import colors from '../consts/Colors';
import {CoinListResult} from '../store/api/coinList';

type Props = {
  coin: CoinListResult;
};

const CoinListItem: React.FC<Props> = ({coin}) => {
  const dayPriceChangeColor =
    coin.price_change_percentage_24h_in_currency > 0
      ? colors.green
      : colors.red;

  console.log(coin.sparkline_in_7d);

  const weekPriceChangeColor =
    coin.price_change_percentage_24h_in_currency > 0
      ? colors.green
      : colors.red;

  return (
    <View style={styles.container}>
      <Image source={{uri: coin.image}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {coin.name} ({coin.symbol.toUpperCase()})
        </Text>
        <Text style={styles.price}>
          Price: ${coin.current_price.toLocaleString()}
        </Text>
        <Text style={{color: dayPriceChangeColor}}>
          24h Change: {coin.price_change_percentage_24h_in_currency?.toFixed(2)}
          %
        </Text>
        <Text style={{color: weekPriceChangeColor}}>
          7d Change: {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
        </Text>
        <Text>Market Cap Rank: #{coin.market_cap_rank}</Text>
        <LineChart
          style={styles.sparkline}
          data={coin.sparkline_in_7d.price}
          svg={{stroke: weekPriceChangeColor}}
          contentInset={{top: 2, bottom: 2}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sparkline: {
    height: 50,
    flex: 1,
    marginTop: 5,
  },
});

export default CoinListItem;
