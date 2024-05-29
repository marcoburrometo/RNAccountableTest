import React from 'react';
import {Text} from 'react-native';
import {CoinListResult} from '../store/api/coinListApi';

type Props = {
  coin: CoinListResult;
};

const CoinDetails: React.FC<Props> = ({coin}) => {
  return (
    <Text>
      {coin.name} {coin.id} {coin.symbol} {coin.current_price}{' '}
      {coin.last_updated}
    </Text>
  );
};

export default CoinDetails;
