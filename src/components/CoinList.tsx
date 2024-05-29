import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CoinListResult, useGetCoinListQuery} from '../store/api/coinList';
import CoinListItem from './CoinListItem';

function CoinList() {
  const [page, setPage] = useState(1);
  const [listItems, setListItems] = useState<CoinListResult[]>([]);
  const {isLoading, isFetching, data, error, refetch} = useGetCoinListQuery(
    {page},
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (data?.length) {
      // Append new data to existing data if page is greater than 1, otherwise set new data
      if (page === 1) {
        setListItems(data);
        return;
      }
      setListItems(prevItems => [...prevItems, ...data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // If there is an error and there is no data, otherwise we stay positive :)
  if (error && !listItems?.length) {
    return <Text>Error! :(</Text>;
  }

  return (
    <View style={style.container}>
      <FlatList
        data={listItems}
        renderItem={({item}) => <CoinListItem coin={item} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              if (page === 1) {
                refetch();
              } else {
                setPage(1);
              }
            }}
          />
        }
        onEndReached={() => {
          if (!isFetching) {
            setPage(p => p + 1);
          }
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          if (isFetching && page > 1) {
            return <ActivityIndicator style={{paddingVertical: 20}} />;
          }
        }}
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
