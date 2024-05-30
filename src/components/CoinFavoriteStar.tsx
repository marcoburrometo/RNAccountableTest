import React, {useCallback, useEffect, useRef, useState} from 'react';

import LottieView from 'lottie-react-native';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addFavoriteCoin,
  favouriteCoinsSelector,
  removeFavoriteCoin,
} from '../store/slices/userData';

type Props = {
  coinId: string;
  size?: number;
};

const CoinFavoriteStar = ({coinId, size = 40}: Props) => {
  const isFavorite = useSelector(favouriteCoinsSelector).includes(coinId);
  // Hack, speed is 1 to avoid showing the star animation on startup
  const [speed, setSpeed] = useState(1);
  const dispatch = useDispatch();
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (isFavorite) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.reset();
    }
  }, [isFavorite]);

  const toggleFavorite = useCallback(() => {
    // From now on the animation will be shown
    setSpeed(1000);
    if (isFavorite) {
      dispatch(removeFavoriteCoin(coinId));
    } else {
      dispatch(addFavoriteCoin(coinId));
    }
  }, [dispatch, isFavorite, coinId]);

  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <LottieView
        ref={lottieRef}
        duration={speed}
        loop={false}
        source={require('../assets/lottie/star.json')}
        style={{width: size, height: size}}
      />
    </TouchableOpacity>
  );
};

export default CoinFavoriteStar;
