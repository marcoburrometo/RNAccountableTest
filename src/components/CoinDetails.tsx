import React, {useMemo, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import colors from '../consts/Colors';
import {useGetCoinDetailsQuery} from '../store/api/coinDetailsApi';
import {formatPrice, priceChangeColor} from '../utils/price';
import CoinChart from './CoinChart';
import CoinFavoriteStar from './CoinFavoriteStar';

type Props = {
  coinId: string;
};

const CoinDetails: React.FC<Props> = ({coinId}) => {
  const [vsCurrency, setVsCurrency] = useState('usd');
  const {data, isFetching, refetch, error} = useGetCoinDetailsQuery(coinId);
  const currencies = useMemo(
    () => Object.keys(data?.market_data.current_price || {}),
    [data],
  );

  if (!data) {
    if (error) {
      console.error(error);
      return <Text>Error fetching data</Text>;
    }

    // TODO: Nice skeleton loader here :)
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl onRefresh={refetch} refreshing={isFetching} />
      }>
      {error && <Text>Error fetching data. Data is not in sync.</Text>}
      <View style={styles.header}>
        <Text style={styles.headerText}>{`${data.name} (${data.symbol})`}</Text>
        <CoinFavoriteStar coinId={coinId} size={50} />
      </View>
      <Text style={styles.date}>{`Last Updated: ${new Date(
        data.last_updated,
      ).toLocaleString()}`}</Text>
      <Text style={styles.label}>Select currency</Text>
      <Dropdown
        style={styles.dropdown}
        data={currencies.map(currency => ({
          label: currency.toUpperCase(),
          value: currency,
        }))}
        value={{label: vsCurrency.toUpperCase(), value: vsCurrency}}
        onChange={value => setVsCurrency(value.value)}
        labelField="label"
        valueField="value"
      />
      <Text
        style={[
          styles.price,
          {color: priceChangeColor(data.market_data.current_price[vsCurrency])},
        ]}>{`Current Price: ${formatPrice(
        data.market_data.current_price[vsCurrency],
        vsCurrency,
      )}`}</Text>
      <Text style={styles.field}>{`Market Cap: ${formatPrice(
        data.market_data.market_cap[vsCurrency],
        vsCurrency,
      )}`}</Text>
      <Text style={styles.field}>{`Total Volume: ${formatPrice(
        data.market_data.total_volume[vsCurrency],
        vsCurrency,
      )}`}</Text>
      <CoinChart coinId={coinId} vsCurrency={vsCurrency} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    flex: 1,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  price: {
    fontSize: 16,
    marginVertical: 5,
  },
  field: {
    fontSize: 16,
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    marginVertical: 5,
  },
  date: {
    fontSize: 14,
    color: colors.darkGrey,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default CoinDetails;
