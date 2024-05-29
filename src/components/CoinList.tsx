import React from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {useGetCoinListQuery} from '../store/api/coinList';
import CoinListItem from './CoinListItem';

function CoinList() {
  const {isLoading, isFetching, data, error, refetch} = useGetCoinListQuery(
    {page: 1},
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // If there is an error and there is no data, otherwise we stay positive :)
  if (error && !data?.length) {
    return <Text>Error! :(</Text>;
  }

  console.log('.....', isLoading, isFetching, error);

  return (
    <View style={style.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <CoinListItem coin={item} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CoinList;
