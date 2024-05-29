import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {RootStackParamList} from '../../App';
import CoinDetails from '../components/CoinDetails';

type RouteProps = RouteProp<RootStackParamList, 'CoinDetails'>;

function CoinDetailsScreen() {
  const {params} = useRoute<RouteProps>();
  const {setOptions} = useNavigation();

  useEffect(() => {
    // Set the title of the screen to the coin name
    if (params?.coin) {
      setOptions({
        title: `${params.coin.name} (${params.coin.symbol.toUpperCase()})`,
      });
    }
  }, [params, setOptions]);
  if (!params?.coin) {
    return null;
  }

  return <CoinDetails coin={params?.coin} />;
}

export default CoinDetailsScreen;
