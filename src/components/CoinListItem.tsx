import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-svg-charts';
import colors from '../consts/Colors';
import {CoinListResult} from '../store/api/coinList';
import {priceChangeColor} from '../utils/price';

type Props = {
  coin: CoinListResult;
};

const CoinListItem: React.FC<Props> = ({coin}) => {
  const priceChange24hColor = priceChangeColor(
    coin.price_change_percentage_24h_in_currency,
  );
  const priceChange7dColor = priceChangeColor(
    coin.price_change_percentage_7d_in_currency,
  );

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
        <Text style={[styles.priceChange, {color: priceChange24hColor}]}>
          24h Change: {coin.price_change_percentage_24h_in_currency?.toFixed(2)}
          %
        </Text>
        <Text style={[styles.priceChange, {color: priceChange7dColor}]}>
          7d Change: {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
        </Text>
        <Text style={styles.rank}>
          Market Cap Rank: #{coin.market_cap_rank}
        </Text>
      </View>
      <LineChart
        style={styles.sparkline}
        data={coin.sparkline_in_7d.price}
        svg={{stroke: priceChange7dColor}}
        contentInset={{top: 2, bottom: 2}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 120,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priceChange: {
    fontSize: 14,
  },
  rank: {
    fontSize: 14,
    marginVertical: 4,
  },
  sparkline: {
    width: 60, // Adjust width as needed
    height: 40, // Adjust height as needed
    marginLeft: 10,
  },
});

export default CoinListItem;
