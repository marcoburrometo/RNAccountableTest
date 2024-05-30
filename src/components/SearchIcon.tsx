import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CoinList'>;

function SearchIcon() {
  const {navigate} = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('Search');
      }}>
      <Text>Search</Text>
    </TouchableOpacity>
  );
}

export default SearchIcon;
