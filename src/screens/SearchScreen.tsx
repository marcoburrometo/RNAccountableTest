import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../../App';
import colors from '../consts/Colors';
import {useSearchCoinQuery} from '../store/api/coinListApi';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CoinList'>;

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const {isFetching, data} = useSearchCoinQuery(searchText, {
    skip: !searchText,
  });
  const {replace} = useNavigation<NavigationProp>();
  return (
    <View>
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search"
        style={{
          borderWidth: 1,
          padding: 10,
          margin: 10,
          backgroundColor: colors.white,
          borderRadius: 5,
        }}
      />
      {isFetching && <Text>Loading...</Text>}

      {data?.coins.map(coin => (
        <TouchableOpacity
          key={coin.id}
          style={{
            padding: 10,
            borderBottomWidth: 1,
            borderColor: colors.grey,
          }}
          onPress={() => {
            replace('CoinDetails', {coin});
          }}>
          <Text>{coin.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SearchScreen;
