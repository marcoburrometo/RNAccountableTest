import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../consts/Colors';

type Props = {
  refetch: () => void;
};

const FetchError: React.FC<Props> = ({refetch}) => (
  <View style={styles.container}>
    <LottieView
      source={require('../assets/lottie/error.json')}
      autoPlay
      loop
      style={{width: 200, height: 200}}
    />
    <Text style={styles.text}>Error fetching data. </Text>
    <TouchableOpacity onPress={refetch}>
      <Text style={styles.tryAgainText}>Try again</Text>
    </TouchableOpacity>
  </View>
);

export default FetchError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  tryAgainText: {
    fontSize: 16,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
